---
title: "Sonarqube community with Branch"
description: "为sonarqube开源版本增加多分支支持 插件地址 项目地址：https://github.com/mc1arke/sonarqube-community-branch-plugin 下载地址：https://github.com/mc1arke/sonarqube-community-branch-plugin/releases wget https://github.com/mc1arke/sonarqube-community-branch-plugin/releases/downloa..."
date: "2024-02-04"
tags: ["sonarqube", "Sonar Systems Market"]
readingTime: 1
slug: "sonarqube-community-with-branch-plugins"
---
为sonarqube开源版本增加多分支支持
# 插件地址
项目地址：https://github.com/mc1arke/sonarqube-community-branch-plugin

下载地址：https://github.com/mc1arke/sonarqube-community-branch-plugin/releases
```
wget https://github.com/mc1arke/sonarqube-community-branch-plugin/releases/download/1.14.0/sonarqube-community-branch-plugin-1.14.0.jar
```
# 插件位置
```
mv  sonarqube-community-branch-plugin-1.14.0.jar /usr/local/sonarqube/extensions/plugins/  #/usr/local/sonarqube为sonarqube的安装目录，根据实际情况修改
```
# 修改配置
```
grep 'sonar.ce.javaAdditionalOpts|sonar.web.javaAdditionalOpts' sonar.properties #以下两项配置其他不变，修改1.14.0为你下载的版本
sonar.web.javaAdditionalOpts=-javaagent:./extensions/plugins/sonarqube-community-branch-plugin-1.14.0.jar=web
sonar.ce.javaAdditionalOpts=-javaagent:./extensions/plugins/sonarqube-community-branch-plugin-1.14.0.jar=ce
```
# 重启
```
su - sonar
cd /usr/local/sonarqube/bin/linux-x86-64
./sonar.sh stop
./sonar.sh start
```

# 修改sonar扫描参数
```
SonarScanner.MSBuild [begin|end] /key:project_key [/name:project_name] [/version:project_version] [/s:settings_file] [/d:sonar.token=token] [/d:sonar.{property_name}=value]
```
