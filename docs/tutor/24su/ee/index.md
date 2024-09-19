---
title: 电控硬件组2024夏培训
---

## 1. 环境配置

必要软件安装：VSCode + Keil5 + STM32CubeMX

跟随这个视频：[开发环境搭建，一步不跳，一刀不剪，奶奶都能学会版。](https://www.bilibili.com/video/BV19V411g7gD)主要是配置插件Keil assistant，介绍相关使用方法。

:::tip
注意：
1. 软件安装包在该文档同级目录下《软件压缩包》
2. 解压keygen时，就是给keil5破解liscense时，记得关闭电脑所有防火墙！不然keygen会被删除
3. 视频中示例程序在该文档同级目录下，`/示例程序/TEST`
:::

## 2. Git

[安装Git - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600/896067074338496)

看看这个文档，了解这个世界上最nb的软件之一 git ，和最牛逼的网站之一 github。最好配合vscode中插件使用，如果是会用git的，不强求用vscode插件。

vscode，git和github联合开发教程：[电控：配置 Git 环境](/tutor/24su/ee/配置-Git-环境)

## 3. C/C++基础

黑马程序员c++教程1-39节课

* <https://www.bilibili.com/video/BV1vs411n7TH/>

## 4. 初级电控教程

<https://www.bilibili.com/video/BV1z14y1G77V/>
  
* 首先看完【1.1】【1.2】【2.2】。

:::info
### 第一次作业考核

形式：线下验收

1. 点灯：能做到这步代表你的开发环境没有问题，能进行最简单的 GPIO 外设操作。

2. 创建git仓库作为你们培训期的代码库，关联一个远程github仓库，并将github仓库的网址发给电控组群和电控组长。
:::

* 然后再看 【2.3】到【2.7】。

  这个教程是很速通的，但是对于底层的东西介绍很少，对以后的开发有隐患。所以，看完中科大的电控基础教程还不够，必须看高级电控教程。

  注意：不要`--cpp11`，在以后的开发中（freertos的开发）会出问题

:::info
### 第二次作业考核

形式：线下验收

1. 转动舵机

2. uart实现两块f1板子小数据量的通信,比如板子1给板子2发送一个浮点数。（回忆一下浮点数有几位）

3. adc测量干电池的电压，普通模式测量+DMA模式测量

4. github学会邀请其他人共同开发
:::

### 4.1. 电子实践技术基础中的基础 

有用的硬件网站资料：[硬件实用链接](/external/硬件实用链接)。

1. 焊接

* [【生活冷知识】焊工永远不会告诉你的10个焊接小技巧，看到就是赚到~](https://www.bilibili.com/video/BV1xN4y1U7f2)：很好的英文视频，没有中文字幕（难绷），相信各位的英文水平好吧

* 被电烙铁烫伤后立刻用冷水冲洗，不留疤不疼痛，硬件组用过都说好。

2. PCB 制作

* [【保姆级】二十分钟零基础PCB绘制打样一条龙教程（立创EDA专业版）](https://www.bilibili.com/video/BV1J24y1Z7cY/)
  
  这篇文章有白嫖打样的注意事项打板小建议

## 5. 高级电控教程

> 得看完，不要求实践出来

https://www.bilibili.com/video/BV18X4y1M763/?p=1&vd_source=e11ee53de2792f86d2e549bf4753b61f

看P5到P40

:::info
### 第三次作业考核
1. 会线焊线，线焊xt60和xt30头，贴片
2. 画一块板子，自由设计（可以是DCDC模块，可以是CAN收发器，甚至可以是个led灯，简单入门一下pcb制作）
3. 理解寄存器编程（理解就行，知道有这个东西）
:::

### 5.1 RM 常用硬件介绍

https://www.bilibili.com/video/BV1fL411t7j7/

[目录](https://space.bilibili.com/174093301/channel/seriesdetail?sid=363329)如下（5个视频都看完）：

* [南工骁鹰硬件培训 课程介绍](https://www.bilibili.com/video/av804956971)

* [南工骁鹰硬件培训 1-1 RM硬件系统简介](https://www.bilibili.com/video/av462471942)

* [南工骁鹰硬件培训 1-2 裁判系统](https://www.bilibili.com/video/av505083040)

* [南工骁鹰硬件培训 1-3 线材与接头](https://www.bilibili.com/video/av975236020)

* [南工骁鹰硬件培训 1-4 机器人走线与硬件结构](https://www.bilibili.com/video/av720284174)

## 6. CAN 通信

* 华南虎的can通信教程

  [CAN通信速成！从会到不会~](https://www.bilibili.com/video/BV1Dq4y1J7WA/)

* 中科大的can通信教程

  [【中科大RM电控合集】小白也能看懂的CAN通信+STM32CubeMX编程](https://www.bilibili.com/video/BV1HY411D7Ar/)

说实话二者各有优劣，最好都看看，反正can通信这一篇没有人只看一遍就完全掌握。

### 6.1. 简单认识无刷电机和 FOC 控制

https://www.bilibili.com/video/BV1ig411S7gX/

https://www.bilibili.com/video/BV11V41127pq/

:::info
### 第四次作业考核

1. 用can通信控制转动大疆M3508电机和GM6020电机（用大疆c板或达妙开发板）

2. 自己焊接CAN线和供电线控制多个大疆M3508电机和GM6020电机（不允许使用分电板）
:::

### 6.2. uart 用 DMA 双缓冲收数据

结合之前所学内容，研究示例程序中uart目录下的drv_uart文件，并用dma双缓冲接收DJI-DT7遥控器数据（从dr16接收）

:::note
示例代码已经写好，如果有兴趣，最好也可以自己写一份。
:::

## 7. 第一个控制器 - PID 控制器

华南虎的pid教程
https://www.bilibili.com/video/BV1B54y1V7hp/?p=1&vd_source=e11ee53de2792f86d2e549bf4753b61f
中科大的pid教程
https://www.bilibili.com/video/BV1Uh4y1f7cL/
(【3.6】)

## 8. 完成麦轮底盘的数学推导并形成代码

https://blog.csdn.net/Naiva/article/details/123495023
（只看麦克纳姆轮部分）

:::info
### 第五次作业考核

1. 用 DMA 双缓冲接收并解码遥控器数据

2. 用 PID 控制器控制3508电机转速

3. 完成麦克纳姆轮底盘运动控制
:::

## 9. 云台电机控制部分

结合之前pid所学，用双环pid（我的理解：双环就是两个pid嵌套）控制GM6020电机定角度转动

:::warning
思考编码器0到360°跳变时怎么处理
:::

## 10. freeRTOS 的使用

可以看《RoboMaster开发板C型嵌入式软件教程文档》中freeRTOS篇。

（《RoboMaster开发板C型嵌入式软件教程文档》里也有其他知识点，想看的也可以看）

## 11. 陀螺仪的使用和云台控制

上网搜一下陀螺仪和加速度计，并了解一下欧拉角

现在还没有能力直接写姿态解算算法，参考一下别人写的

https://github.com/WangHongxi2001/RoboMaster-C-Board-INS-Example

在这个基础上实现云台控制（用姿态解算后提供的yaw和pitch角度和陀螺仪的角速度作为pid的反馈数据）

:::info
### 第六次作业考核

1. 用freeRTOS完成云台控制（注意姿态解算任务和控制任务，在姿态解算代码基础上加任务）
:::