#!/usr/bin/env groovy

properties([
    disableConcurrentBuilds(),
    parameters([
		choice(choices:"build\nrelease", description: "Select a step", name: 'PHASE'),
        string(description: 'If PHASE=release, you must enter a version number to create a new release', defaultValue: '', name: 'VERSION')
    ])
])

node () {
	generic = new be.kuleuven.icts.Generic()
	checkout scm 
	generic.time {
		remote_ftp_server = 'upload.cc.kuleuven.be'
		if (params.PHASE == 'build') {
			if (env.TAG_NAME) {
				remote_location = "releases/${env.TAG_NAME}"
			} else {
				remote_location = "branches/${env.BRANCH_NAME}"
			}
		} else {
			remote_location = "releases/${params.VERSION}"
		}

		echo "Will upload dist/ to: '${remote_ftp_server}:${remote_location}'"

		try {
			sh 'rm -rf dist'
			docker.image('registry.icts.kuleuven.be:5000/icts/icts-centos7').inside {
				stage('install yum deps') {
					sh 'yum -y install wget'
					sh '/usr/bin/wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo'
					sh 'curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -'
					sh 'yum -y install git nodejs yarn'
				}

				stage('install node deps') {
					sh 'yarn install'
				}
				stage('build site') {
					sh 'yarn build-storybook'
				}
			}

			stage('publish build') {
				withCredentials([usernamePassword(
					credentialsId: 'stijl-ftp', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')
					])
				{
					sh "lftp -u '${env.USERNAME},${env.PASSWORD}' -e 'lcd dist/; mirror -vvv -R -e ./ ${remote_location}/' '${remote_ftp_server}'"
				}
			}

			currentBuild.result = 'SUCCESS'
		} catch (err) {
			currentBuild.result = 'FAILURE'
		} finally {
			sh 'rm -rf dist'
		}
	}
}
