---
title: 课题一：探秘FreeRTOS
---

## 简介
FreeRTOS是Robomaster嵌软开发必不可缺的框架，使用它我们可以轻松整合多项任务，实现类似Windows/Linux的多进程服务。在这之前各位可能还没有进行过比FreeRTOS更为基础的单片机开发，本课题将从最基础的任务开始，引导大家快速上手嵌入式软件开发。

本课题忽略了各位对编程语言的掌握程度，若无法阅读参考资料中的简短代码，请先学习C++（附参考资料）。

## 使用材料
Robomaster C型开发板、三色LED灯泡、红外光发射二极管、红外光敏二极管、STLink、按键式开关、若干导线。
因疫情特殊情况，材料发放请等待后续指示，各位可先进行理论学习和代码编写，实机调试则另行安排。

## 基本任务及指标

所有任务编写的代码均需要注释，注释为重要评分依据‼️

### Mission 1 点亮LED灯

    此任务无需使用FreeRTOS，只需要使用最基础的SuperLoop完成GPIO的配置，点亮一个LED灯泡即可。
### Mission 2 调试红外二极管的发射与接收

    此任务无需使用FreeRTOS，需要配置使用发光二极管发射信号，光敏二极管接收信号并使用调试器在电脑端显示。
### Mission 3 制作LED调色灯

    此任务需使用FreeRTOS，通过指定的RGB值实现配置LED灯泡发出对应颜色的光。
### Mission 4 配备红外开关的LED呼吸灯

    将Mission3的RGB灯迭代为呼吸灯样式（亮度的无极调节），并搭配红外信号处理模块实现一个红外开关模块。

## 加分指标
1. 使用VsCode + Platform而非Keil编写工程
2. 使用Git版本管理工具控制项目迭代
3. 使用Markdown标记语言撰写任务报告


## 最终需要上传的文件
1. 每个Mission的工程压缩包（使用Git版本管理的仅提交两个工程文件即可：非FreeRTOS项目一个，FreeRTOS项目一个）
2. 任务汇报书，需包括相关实物图

请将所有文件打包发送至邮箱<doeca@cqu.edu.cn>

第一次线上会议答疑：2022年11月13日

第一次线上会议答疑：2022年11月16日，有录屏。

中期汇报时间（待定）：2022年11月13日20:00

最终截止时间（待定）：2022年11月18日23:59

## 参考资料

> 部分课题内容需要使用境外网络服务访问
> 
> [请见课程实用链接](/外部资料/课程实用链接)

1. (B.2) 计算机教育中缺失的一课
2. (C.1) Robomaster C型开发板官方教学包。
3. Youtube教学视频（未找到中文版）：[Introduction to FreeRTOS](https://www.youtube.com/watch?v=F321087yYy4&list=PLEBQazB0HUyQ4hAPU1cJED6t3DU0h34bz)
4. (A.1) C++菜鸟教程：https://www.runoob.com/cplusplus/cpp-tutorial.html
5. VsCode配置指南：https://blog.gztime.cc/posts/2020/6b9b4626/
6. B站UP主爱上半导体（相关器材的原理）：https://space.bilibili.com/395188578
7. Markdown教程：https://www.runoob.com/markdown/md-tutorial.html
8. Git教程：https://www.liaoxuefeng.com/wiki/896043488029600