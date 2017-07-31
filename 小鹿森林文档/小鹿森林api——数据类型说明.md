# 小鹿森林api——数据类型说明

[toc]

## 类型说明

### Member 
```
member: {
	id: int 用户唯一Id
	username: string 用户电话号
	isVip: 0/1 是否为会员：0 不是，1 是
	registerTime: datatime 注册时间
	joinTime：datatime 成为会员时间
	member_level: int  此用户级别，查表
	defaultAddress: int 默认地址的id
	invitation_code: String 用户唯一邀请码
	phone: string 用户手机号
}
```

### Address
```
address: {
	id: int 地址的唯一id
	name: String 收件人姓名
	phone: String 收件人电话
	province: String 省份
	city: String 市
	district: String 区/县 
	addr: String 街道具体信息 
}
```

### Message
```
message: {
	id: int 系统消息id
	title: string 消息标题
	sendTime: dataTime 发送时间
	text: string 消息文字
}
```

### Baby
```
baby {
		id: int 宝宝唯一id
		name: string 宝宝名字
		sex: int 性别：0-男孩 1-女孩
		height: int 宝宝身高
		weight: int 宝宝体重
		completion_rate: int 表示完成比率
		birthday: dataTime 宝宝生日时间戳
		top_size: int 上装尺码
		bottom_size: int 下装尺码
		top_price: Array [min, max] 上装价钱
		bottom_price: Array [min, max] 下装价钱
		suit_price: Array [min, max] 套装价钱
		}
		hobbies: string-json-object
			{
				宝宝爱好码: 爱好程度：0 1 2 3
				
				...
			}
		skin_color: int 肤色码
		baby_body: Array [身体特征码, 身体特征码, ...]
		brand: Array [品牌码, 品牌码, ...] 宝宝喜欢的品牌
		style: string-json-object{
			风格码: 0-不喜欢  1-喜欢
			...
		}
		atom: Array [元素码，元素码]
		color: string-json-object {
			颜色码：0-不喜欢 1-喜欢
			...
		}
		expect: int 是否期待特别款式
			0：不期待
			1：无所谓
			2：期待
			3：很期待
		suit: int 是否成套
			0：不成套
			1：无所谓
			2：成套
		attention: Array [注意事项码, 注意事项码 ...],
		sundry: Array [杂货需求码, 杂货需求码, ...]
		photo: string 宝宝照片路径
		own_cloth: Array [ClothId, ClothId] 已经买过的衣服
		
	}
```

### 物流
TODO：等待物流对象确定


### Order
```
order: {
	id: String 订单唯一id
	member_id: String 下单用户唯一Id
	expect_day: datatime 期望配送日
	create_day: datatime 订单创建日
	status: int 订单状态码
	designer: int 设计师码
	baby: {
		id: int 订单目标宝宝唯一Id
		name: string 宝宝名字
		height: int 此订单宝宝身高
		weight: int 此订单宝宝体重
		sex:
		top_size:
		bottom_size
		
	}
	message: String 用户留言
	name: String 收件人姓名
	phone: String 收件人电话
	province: String 省份
	city: String 市
	district: String 区/县 
	addr: String 街道具体信息 
	type: 0-年盒子 1-手动订的盒子 
	goods: Array [Cloth, Cloth, ...] 此单搭配的衣物
	designer_word: Array 设计师寄语-目前会有三条
	save: Array [ClothId, ClothId, ...] 要买的衣服
	change: Array [  要换尺码的衣服
		{
			id: int 换尺码的衣服的id
			message: string 用户留言
		}
		...
	] 
	back: Array [{
		id: int 退的衣服的id
		
	}, ...] 要退回的衣服
	
	//TODO: 折扣规则
	//TODO: 送货运单号，退货运单号, 换货运单号
	
	price_all: float 衣服总价
	price: float 选择后价格
	discount: int 折扣率 
	
	remark: string 管理员备注
}
```
### Cloth
所有的衣服，货号唯一，所以货号当做id即可
```
cloth: {
	id: int 唯一id
	productCode: string 衣服货号
	productStyleCode: String 衣服款号
	
	// 基本信息
	name: String 衣服名字
	brand: int 品牌码
	sex: 0/1/2 适合的性别
	category: int 衣服大类码
	categorySub: int 衣服子类码
	season: int 季节码
	style: Array [衣服风格码, 衣服风格码...]
	atom: Array [元素码，元素码]
	color: Array [颜色码，颜色码]
	price: float 衣服价格
	fabric: string-json-Object 本款面料
		{
			"面料码": int 面料占比
			"面料码": 
			...
		}
		
	pic: String 主图片路径
	simplePic: String 小图路径
	atomPic: String 细节图路径
	
	// 订单相关信息
}
```

## 码值表

### 账号权限说明
- `member_level`
	- `0`：管理员
	- `1`：设计师
	- `2`：仓库管理员
	- `3`:   未支付用户
	- `4`:   会员

### 会员码
- `isVip`
	- `0`：未支付用户
	- `1`：会员

### 订单状态说明
- `order.status`
	- `0`：待身份验证（已废弃）
	- `1`：待下单
	- `10`：待搭配
	- `15`：待发货
	- `20`：已发货
	- `21`：已结算未退货
	- `22`：已退货未结算
	- `30`：完成
	- `40`：订单异常
	- `100`：管理员取消
	- `101`：用户取消
	- `102`：终止

### 设计师码
设计师要有编号：

- `0` ：异常-未指定设计师（以前的，某些订单，过了待下单状态，但是每指定设计师。往后的订单，必须指定设计师才可以下单）
- `6`：钱晓峰
- `8`：章迪
- `14`：顾吉
- `13`：陈希南
- `11`：肖冰影
- `1`：admin
- `7`：李思宣
- `9`：冯晓宇
- `10`：Eric
- `12`：测试
- `15`：乐天

### 退货原因码
- `0`：已经有相似衣服
- `1`：不喜欢这种风格
- `2`：尺码大了
- `3`：尺码小了
- `4`：价钱虚高


### 衣服种类码
结构

- 大类（category）
	- 小类（category_sub）


- `1`：配饰类
	- `1`：包包
	- `2`：头饰
	- `3`：帽子，围巾，手套
	- `4`：连裤袜
	- `5`：项链
	- `6`：领带
	- `7`：鞋
- `2`：外套类
	- `8`：大衣
	- `9`：夹克
	- `10`：风雨衣
	- `11`：羽绒服
	- `12`：外套背心
- `3`：针织类
	- `13`：套头毛衣
	- `14`：毛衣开衫
	- `15`：针织连衣裙
- `4`：圆机织上装类
	- `16`：长袖T恤
	- `17`：短袖T恤 
	- `18`：无袖T恤
	- `19`：卫衣
- `5`：梭织上装类
	- `20`：斗篷
	- `21`：长袖衬衫（女）
	- `22`：外套背心（男）
	- `23`：梭织背心
	- `24`：梭织西装外套
- `6`：圆机织裤装类
	- `25`：打底裤
	- `26`：运动裤
	- `27`：圆机织短裤
- `7`：梭织裤装类
	- `28`：梭织短裤
	- `29`：卡其裤
	- `30`：牛仔裤
- `8`：连衣裙类
	- `31`：长袖连衣裙
	- `32`：短袖连衣裙
	- `33`：无袖连衣裙
- `9`：半套裙
	- `34`：半裙
- `10`：套装类
	- `35`：圆机织套装
	- `36`：梭织套装
	- `37`：表演服
- `11`：泳装
	- `38`：比基尼
	- `39`：防晒服
	- `40`：连体衣
	- `41`：沙滩裤

### 衣服颜色码
- `0` ：黑色
- `1` ：蓝色
- `2` ：绿色
- `3` ：灰色
- `4` ：橙色
- `5` ：紫色
- `6` ：红色
- `7` ：黄色
- `8` ：棕色
- `9` ：白色
- `10` ：粉色
- `11` ：裸色
- `12` ：粉蓝
- `13` ：米黄
- `14` ：淡绿
- `15` ：淡紫
- `16` ：金色
- `17` ：银色
- `18` ：透明
- `19` ：深红
- `20` ：深绿
- `21` ：藏青
- `22` ：深紫
- `23` ：深棕
- `24` ：深灰
- `25` ：浅棕
- `26` ：浅灰
- `27` ：土黄
- `28` ：墨绿
- `29` ：咖啡
- `30` ：军绿
- `31` ：淡橘
- `32` ：卡其
- `33` ：彩虹
- `34` ：玫红
- `35` ：酒红

### 衣服材料码
- `1`：Cotton
- `2`：Linen
- `3`：Wool
- `4`：Rabbit hair
- `5`：Cashmere
- `6`：Mohair
- `7`：Silk
- `8`：Polyester
- `9`：Nylon
- `10`：Acrylic
- `11`：Spandex
- `12`：Elastane
- `13`：Acetate
- `14`：Viscose
- `15`：Rayon
- `16`：Lyocell
- `17`：Leather

### 衣服季节码
- `0` 春秋
- `1` 夏季
- `2` 冬季
- `3` 四季

### 衣服风格码

- `0`：可爱
- `1`：酷帅
- `2`：邻家素雅
- `3`：绅士
- `4`：实用
- `5`：邻家鲜艳
- `6`：公主
- `7`：名媛
- `8`：欧美
- `9`：日韩

### 衣服元素码（衣服细节）
- `0`：格子
- `1`：条纹
- `2`：波点
- `3`：几何
- `4`：爱心
- `5`：蝴蝶结
- `6`：碎花
- `7`：植物
- `8`：花卉
- `9`：水果
- `10`：小动物
- `11`：卡通
- `12`：涂鸦
- `13`：文字
- `14`：立体图案
- `15`：印花
- `16`：珍珠
- `17`：亮片
- `18`：刺绣
- `19`：钉珠
- `20`：蕾丝
- `21`：动物纹

### 衣服品牌码
- `0`：GAP
- `1`：H&M
- `2`：ZARA
- `3`：Uniqlo
- `4`：Adidas
- `5`：Nike
- `6`：JNBY
- `7`：Balabala
- `8`：Pepco
- `9`：Disney
- `10`：Jacadi
- `11`：Bonpoint
- `12`：KENZO
- `13`：NUNUNU
- `14`：Mayoral
- `15`：Next
- `16`：Ralph Lauren
- `17`：TOMMY HILFIGER
- `18`：BOBO CHOSES
- `19`：MIKI HOUSE

### 性别码
- `-1`：未选择
- `0`：男孩
- `1`：女孩
- `2`：无

### 宝宝身体特征码
**肤色(skin_color)**

- `0`：雪白
- `1`：偏白
- `2`：普通
- `3`：小麦
- `4`：黝黑

**特征(baby_body)**

- `0`：头大
- `1`：脖子粗
- `2`：手臂粗
- `3`：手腕粗
- `4`：肚子大
- `5`：屁股大
- `6`：大腿粗
- `7`：脚踝粗

### 宝宝爱好吗
- `0`：运动玩耍
- `1`：周末出游
- `2`：休闲街头
- `3`：正式场合

**喜好程度**

- `0`：从不
- `1`：偶尔
- `2`：经常
- `3`：总是

### 注意事项码
- `0`：不要纽扣
- `1`：不要牛仔布料
- `2`：不要拉链
- `3`：不要短裙
- `4`：不要金属
- `5`：不要亮片
- `6`：不要长裙
- `7`：不要动物毛皮

### 杂货需求码
- `0`：鞋子
- `1`：首饰
- `2`：背包
- `3`：帽子
- `4`：围巾手套
- `5`：墨镜

### 退货原因码
- `0`：已经有相似的
- `1`：款式不喜欢
- `2`：尺寸偏大
- `3`：尺寸偏小
- `4`：价格虚高
- `5`：面料不喜欢