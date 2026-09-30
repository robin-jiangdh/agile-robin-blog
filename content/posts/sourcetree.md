---
title: "sourcetree 卡顿优化"
description: "如果sourcetree比较卡 执行下面三个命令试试，我今天试了下，感觉好点了。"
date: "2024-01-09"
tags: ["#sourcetreee", "Git"]
cover: "https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/n8Qb1ZAkK88/upload/071240883b1587421013f91a46998c61.jpeg"
readingTime: 1
slug: "sourcetree"
---
如果sourcetree比较卡 执行下面三个命令试试，我今天试了下，感觉好点了。  
git config --global core.preloadindex true  
git config --global core.fscache true  
git config --global [gc.auto](http://gc.auto) 256
