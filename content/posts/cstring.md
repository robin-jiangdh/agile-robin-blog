---
title: "C#中是否可以继承String类?"
description: "C#中是否可以继承String类? 答：String类是sealed类故不可以继承。 当对一个类应用 sealed 修饰符时，此修饰符会阻止其他类从该类继承。 在下面的示例中，类 HoverTree 从类 Keleyi 继承，但是任何类都不能从类 HoverTree 继承。 class Keleyi {}  sealed class HoverTree : Keleyi {} 还可以在重写基类中的虚方法或虚属性的方法或属性上使用 sealed 修饰符。 这将使您能够允许类从您的类继承，并防止它们..."
date: "2020-04-13"
cover: "https://cdn.hashnode.com/res/hashnode/image/upload/v1703834995761/ff0c5d5d-c8e7-48a4-a72c-02c4838f781f.jpeg"
readingTime: 1
slug: "cstring"
---
C#中是否可以继承String类?


答：String类是sealed类故不可以继承。

当对一个类应用 sealed 修饰符时，**此修饰符会阻止其他类从该类继承**。 在下面的示例中，类 HoverTree 从类 Keleyi 继承，但是任何类都不能从类 HoverTree 继承。

```
class Keleyi {} 
sealed class HoverTree : Keleyi {}
```



还可以在重写基类中的虚方法或虚属性的方法或属性上使用 sealed 修饰符。 这将使您能够允许类从您的类继承，并防止它们重写特定的虚方法或虚属性。
