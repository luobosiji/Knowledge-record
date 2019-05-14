**优雅的在github上贡献代码**

1. fork项目
2. `git clone` 资源库fork代码
3. `git remote add upstream https://github.com/vueComponent/ant-design-vue-pro.git` //添加远程地址
4. `git checkout -b my-branch`  创建分支
5. `git commit`  分支提交commit
6. `git checkout master`  切换到主分支
7. `git pull upstream master` 拉取最新代码
8. `git checkout my-branch` 切换到自己的分支
9. `git rebase master`  合并master commit到自己的分支
10. `git push origin my-branch` 更新代码到自己的分支
11. 提交 `Pull Request`(在你的 github 代码仓库页面切换到 branches 页面点击 my-branch 分支后点击 New pull request 按钮, 添加相关注释后提交.)