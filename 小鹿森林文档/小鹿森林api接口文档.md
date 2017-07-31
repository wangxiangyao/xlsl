# 小鹿森林api接口文档

- 目录

[toc]

## 未完善之处
- 各接口，权限定义
- 各接口，返回示例
- 消息的增删改查 发送
- 身高体重比
- 宝宝备注
- 物流接口
- 支付接口

## 基本

### 状态码
依据HTTP标准提供的状态码，来描述返回值。
常用状态码有：
- 200 成功
- 201 成功 新资源已经创建
- 204 成功 资源删除成功
- 304 无变化 客户端使用本地缓存
- 400 非法调用 具体错误查看返回值message字段
- 401 未认证 需要授权的access_token或者已经过期
- 403 不允许的操作 权限管理方面
- 404 未找到资源
- 422 不可指定的请求体
- 500 服务器错误

### 授权使用sessionId

### 返回值基本结构
```
{
  "code": 200,
  "message": "ok",
  "data": {}
}
`data`中存放数据。
```



## 用户操作

### 登录
- URL `/login`
- 方法：`POST`
- 请求参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| username |   String |  是  | 13213195318 | 用户手机号 |
| code |   String |  是  | 6846 | 用户登录：验证码/管理员登录：密码 |
| userType | int |  是  | 0/1 | 从哪里登录，0表示用户登录，1表示内部系统登录 |
- 返回示例
```
{
	code: 200,
	message: "ok",
	data: {
		id:
		username
		isVip
		registerTime
		joinTime
		member_level
		defaultAddress
		invitation_code
	}
}
```

### 获取验证码
- URL `/sendMsgCode`
- 方法：`POST`
- 请求参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| mobile |   String |  是  | 13213195318 | 用户手机号 |

### 查询所有用户
- URL`/member/`
- 请求方法：`GET`
- 请求参数：
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| offset |   int|  否  | 10  | 位移，默认0。如果传10，会从第11个订单开始返回 |
| limit|   int|  否  | 10  | 返回订单数量，默认10。如果传20，就限定只返回20个 |
| searchText | String |  否  | 123123123 | 搜索用户编号 |

- 返回示例
```
{
	code: 200,
	message: "ok",
	data: {
		// 分页相关
		
		item: [
			{
				id: 
				isVip:
				registerTime:
				joinTime:
				member_level
				defaultAddress:
				invitation_code:
			},
			{},
			{},
			...
		]
	}
}
```

### 查询某用户
- URL`/member/<member_id>/`
- 请求方法：`GET`
- URL参数：
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| member_id    |   int |  是  | 1234 | 用户唯一ID |

- 返回示例
```
{
	code: 200,
	message: "ok",
	data: {
		id: 
		isVip:
		registerTime:
		joinTime:
		member_level
		defaultAddress:
		invitation_code:
	}
}
```
### 查询所有会员
- URL`/member/vip/`
- 请求方法：`GET`
- 请求参数：
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| offset |   int|  否  | 10  | 位移，默认0。如果传10，会从第11个订单开始返回 |
| limit|   int|  否  | 10  | 返回订单数量，默认10。如果传20，就限定只返回20个 |
| searchMember | String |  否  | 123123123 | 搜索会员编号 |

- 返回示例
```
{
	code: 200,
	message: "ok",
	data: {
		// 分页相关
		
		item: [
			{
				id: 
				isVip:
				registerTime:
				joinTime:
				member_level
				defaultAddress:
				invitation_code:
			},
			{},
			{},
			...
		]
	}
}
```


### 改变用户vip状态
- URL `/member/vip/`
- 请求方法： `PUT`
- 请求参数:
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| member_id    |   int |  是  | 1234 | 用户唯一ID |
| isVip |   int |  是  | 0 | 将isVip字段改为  |

### 改变用户等级
- URL `/member/level/`
- 请求方法：`PUT`
- 请求参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| member_id    |   int |  是  | 1234 | 用户唯一ID |
| member_level |   int |  是  | 0 | 将用户等级改变为  |


## 宝宝操作

### 查询所有宝宝（是否需要）
- URL`/baby/`
- 请求方法`GET`
- 请求参数

### 查询某宝宝
- URL`/baby/<baby_id>/`
- 请求方法：`GET`
- URL参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| baby_id | Int |  是  | 1234 | 宝宝的唯一id |
- 返回示例
```
{
	code: 200,
	message: "ok",
	data: {
		id
		name
		sex
		height
		weight
		birthday

		top_size
		bottom_size
		top_price
		bottom_price
		suit_price
		hobbies
		skin_color
		baby_body
		brand
		style
		atom
		color
		expect
		suit
		attention
		sundry
		photo

		own_cloth
		completion_rate
	}
}
```

### 查询某用户所有宝宝
- URL`/baby/<member_id>/`
- 请求方法：`POST`
- URL参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| member_id    |   int |  是  | 1234 | 用户唯一ID |

- 返回示例
```
{
	code: 200,
	message: "ok",
	data: {
		// 分页相关
		
		item: [
			{
				id
				name
				sex
				height
				weight
				birthday
		
				top_size
				bottom_size
				top_price
				bottom_price
				suit_price
				hobbies
				skin_color
				baby_body
				brand
				style
				atom
				color
				expect
				suit
				attention
				sundry
				photo
		
				own_cloth
				completion_rate
			},
			{},
			{},
			...
		]
	}
}
```


### 创建新宝宝
- URL`/baby/`
- 请求方法：`POST`
- 请求参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| member_id | int |  是  | 123123 | 这个宝宝属于的那个用户 |
| name | String |  是  | 王宝宝 | 宝宝姓名 |
| sex| Number |  是  | 0 | 性别：0 男孩；1 女孩 |
| height| Number |  是  | 100 | 身高 |
| weight| Number |  是  | 40 | 体重 |
| top_size | Number |  是  | 80 | 上装尺码 |
| bottom_size | Number |  是  | 40 | 下装尺码 |
| birthday | dataTIme |  是  | 时间戳 | 宝宝生日 |
| skin_color | int |  否  |  | 宝宝肤色码 |
| baby_body | Array |  否  |  | 宝宝体态特征码 |
| style | string-json-Object|  否  |  | 宝宝穿衣风格码 |
| atom | Array|  否  |  | 宝宝元素码 |
| color | string-json-Object|  否  |  | 宝宝颜色码 |
| expect | int |  否  |  | 是否期待特别款式 |
| suit | int |  否  |  | 是否需要套装 |
| hobbies | string-json-Object |  否  | | 宝宝场合需求（运动，正式等） |
| photo | String |  否  | | 图片路径 |
| top_price | Array |  否  | | 上装价格区间 |
| bottom_price | Array |  否  | | 下装价格区间 |
| suit_price | Array |  否  | | 套装价格区间 |
| brand | Array |  否  | | 宝宝喜欢的品牌 |
| attention | Array |  否  | | 宝宝注意事项 |
| sundry | Array |  否  | | 宝宝杂货需求 |
- 返回示例
```
{
	code: 200,
	message: "ok",
	data: int 一个id值，表示此新宝宝的id
}
```

### 修改宝宝信息
- URL`/baby/<baby_id>/`
- 请求方法：`PUT`
- URL参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| baby_id | Int |  是  | 1234 | 宝宝的唯一id |
- 请求参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| member_id | int |  是  | 123123 | 这个宝宝属于的那个用户 |
| name | String |  否  | 王宝宝 | 宝宝姓名 |
| sex| Number |  否  | 0 | 性别：0 男孩；1 女孩 |
| height| Number |  否  | 100 | 身高 |
| weight| Number |  否  | 40 | 体重 |
| top_size | Number |  否  | 80 | 上装尺码 |
| bottom_size | Number |  否  | 40 | 下装尺码 |
| birthday | dataTIme |  否  | 时间戳 | 宝宝生日 |
| skin_color | int |  否  |  | 宝宝肤色码 |
| baby_body | Array |  否  |  | 宝宝体态特征码 |
| style | string-json-Object|  否  |  | 宝宝穿衣风格码 |
| atom | Array|  否  |  | 宝宝元素码 |
| color | string-json-Object|  否  |  | 宝宝颜色码 |
| expect | int |  否  |  | 是否期待特别款式 |
| suit | int |  否  |  | 是否需要套装 |
| hobbies | string-json-Object |  否  | | 宝宝场合需求（运动，正式等） |
| photo | String |  否  | | 图片路径 |
| top_price | Array |  否  | | 上装价格区间 |
| bottom_price | Array |  否  | | 下装价格区间 |
| suit_price | Array |  否  | | 套装价格区间 |
| brand | Array |  否  | | 宝宝喜欢的品牌 |
| attention | Array |  否  | | 宝宝注意事项 |
| sundry | Array |  否  | | 宝宝杂货需求 |
- 返回示例
```
{
	code: 200,
	message: "ok",
}
```
### 删除宝宝
- URL`/baby/<baby_id>/`
- 请求方法：`DELET`
- URL参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| baby_id | Int |  是  | 1234 | 宝宝的唯一id |
- 返回示例
```
{
	code: 200,
	message: "ok",
}
```

## 订单操作

### 查询所有订单 （某条件）
- URL `/order/`
- method：`GET`
- 请求参数：

| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| offset |   int|  否  | 10  | 位移，默认0。如果传10，会从第11个订单开始返回 |
| limit|   int|  否  | 10  | 返回订单数量，默认10。如果传20，就限定只返回20个 |
| status | int |  否  | 15 | 搜索此状态订单 |
| designer | int |  否  | 6 | 搜索此搭配师订单 |
| member_id |   int|  是  | 1  | 用户id |
- 返回示例
```
{
	code: 200,
	message: "ok",
	data: {
		// 分页相关
		
		item: [
			{
				id
				expect_day
				create_day
				status
				designer
				baby: {
					id
					name
					sex
				}			
				message
				type
				remark
			},
			{},
			{},
			...
		]
	}
}
```

### 创建订单
- URL`/order/`
- 请求方法：`POST`
- 请求参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| member_id | Int |  是  | 1234 | 用户唯一Id |
| babies | json-Array |  是  | ["123", "123"] | 宝宝的唯一Id组成的数组 |
| expect_day | dataTime |  是  | 123123123123123 | 期望配送日期的时间戳 |
| address_id | int |  是  | 12 | 用户地址的唯一Id |
| message | String |  否  | 需要一套西装 | 此订单的用户留言 |
- 说明
说有手动创建的订单，其`type`为1
- 返回示例
```
{
	code: 200,
	message: "ok",
	data: int 一个id值，表示此新订单的id
}
```

### 查询某订单
- URL `/order/<order_id>/`
- 请求方法`GET`
- URL参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| order_id | Int |  是  | 1234 | 订单的唯一Id |
- 返回示例
```
{
	code: 200,
	message: "ok",
	data: {
		id
		expect_day
		create_day
		status
		designer
		designer_word
		baby: {
			id
			name
			sex
			height
			weight
			top_size
			bottom_size
		}
		
		message
		name
		phone
		province
		city
		district
		addr
		type
			
		goods: [
			{
				id
				style_no

				name
				brand
				sex
				category
				category_sub
				season
				style
				atom
				color
				price
				fabric
				pic
				simple_pic
				atom_pic
			}
			...
		]
		
		save: []
		change: [
			{
				id
				message
			}
			...
		]
		back: [
			{
				id,
				reason: [],
			}
		]
		price_all
		price
		discount

		remark
	},
}
```

### 修改订单
**注意！！！：**
在后台还未下单之前，可以更改，即订单状态为`1`.

- URL `/order/<order_id>/`
- 请求方法：`PUT`
- URL参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| order_id | Int |  是  | 1234 | 订单的唯一Id |
- 请求参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| expect_day | dataTime |  否  | 123123123123123 | 期望配送日期的时间戳 |
| address_id | int |  否  | 12 | 用户地址的唯一Id |
| message | String |  否  | 需要一套西装 | 此订单的用户留言 |
|  name |  string  |  否  | 王相尧 | 收件人姓名 |
|  phone |  String  |  否  | 13213195318 | 电话 |
|  province |  string  |  否  | 河南省 | 省份 |
|  city |  string  |  否  | 洛阳市 | 城市 |
|  district |  string  |  否  | 涧西区 | 区/县 |
|  addr  |  string  |  否  | 街道地址 | 街道信息 |
- 返回示例
```
{
	code: 200,
	message: "ok",
}
```

### 删除订单
- URL `/order/<order_id>/`
- 请求方法`DELET`
- URL参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| order_id | Int |  是  | 1234 | 订单的唯一Id |
- 返回示例
```
{
	code: 200,
	message: "ok",
}
```

### 订单搭配
- URL：`/order/<order_id>/match/`
- 请求方法：`POST`
- URL参数:
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| order_id | Int |  是  | 1234 | 订单的唯一Id |
- 请求参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| goods | JSON-Array |  是  | [Cloth.id， Cloth.id, ...] | 订单的唯一Id |
- 返回示例
```
{
	code: 200,
	message: "ok",
}
```

### 改变订单状态
- URL `/order/<order_id>/status/`
- 请求方法`PUT`
- URL参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| order_id | Int |  是  | 1234 | 订单的唯一Id |
- 请求参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| status | Int |  是  | 0 | 要更新到的状态 |
| message | Int |  否  | 因为用户退货不小心拿错，导致退错 | 额外的信息，比如备注 |
- 返回示例
```
{
	code: 200,
	message: "ok",
}
```

### 更新交易衣服
- URL `/order/<order_id>/goods/`
- 请求方法：`PUT`
- URL 参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| order_id | Int |  是  | 1234 | 订单的唯一Id |
- 请求参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| save | json-Array |  是  | [货号， 货号] | 留下的衣服货号组成的数组 |
| change | json-Array |  是  | [货号， 货号] | 换货的衣服货号组成的数组 |
| back | json-Array |  是  | [货号， 货号] | 退货的衣服货号组成的数组 |
- 返回data参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
|  id | int |  是  | 1 |  订单唯一id |
|  price_all | float |  是  | 100.0 |  总价 |
|  price | float |  是  | 50.0 | 折扣价  |
|  discount| float |  是  | 50 | 折扣百分比  |
- 返回示例
```
{
	code: 200,
	message: "ok",
	data: {
		id
		price_all
		price
		discount
	}
}
```

## 地址操作

### 查询用户所有地址
- URL`/address/`
- 请求方法：`GET`
- 请求参数：
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| member_id | Int |  是  | 1234 | 用户唯一Id |
- 返回示例：
```
{
  "code": 200,
  "data": [
	{
		id: 地址唯一id，
		phone: 电话
		name：收件人姓名
		province: "", 
		city: "", 
		district: "", 
		addr: ""
	},
	...
],
  "message": "ok",
}
```

### 添加地址
- URL：`/address/`
- 请求方法：`POST`
- 请求参数：
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| member_id | int |  是  | 123123 | 用户唯一id |
|  name |  string  |  否  | 王相尧 | 收件人姓名 |
|  phone |  String  |  否  | 13213195318 | 电话 |
|  province |  string  |  是  | 河南省 | 省份 |
|  city |  string  |  是  | 洛阳市 | 城市 |
|  district |  string  |  是  | 涧西区 | 区/县 |
|  addr  |  string  |  是  | 街道地址 | 街道信息 |
- 返回示例：
```
{
  "code": 200,
  "message": "ok",
  "data": int 新地址的唯一id
}
```

### 修改地址
- URL`/address/<address_id>/`
- 请求方法：`PUT`
- URL参数：
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| address_id| Int |  是  | 1234 | 地址的唯一Id |
- 请求参数：
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
|  name |  string  |  否  | 王相尧 | 收件人姓名 |
|  phone |  String  |  否  | 13213195318 | 电话 |
|  province |  string  |  否  | 河南省 | 省份 |
|  city |  string  |  否  | 洛阳市 | 城市 |
|  district |  string  |  否  | 涧西区 | 区/县 |
|  addr  |  string  |  否  | 街道地址 | 街道信息 |
- 返回示例：
```
{
  "code": 200,
  "message": "ok",
  "data": int 新地址的唯一id
}
```

### 删除地址
- URL：`/address/<address_id>/`
- 请求方法：`DELET`
- URL参数：
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| address_id| Int |  是  | 1234 | 地址的唯一Id |
- 返回示例：
```
{
  "code": 200,
  "message": "ok",
  "data": int 新地址的唯一id
}
```

## 商品操作

### 查询所有商品

- URL：`/goods/`
- 请求方法：`GET`
- 请求参数：
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| offset |   int|  否  | 10  | 位移，默认0。如果传10，会从第11个订单开始返回 |
| limit|   int|  否  | 10  | 返回订单数量，默认10。如果传20，就限定只返回20个 |
| searchGoods | String |  否  | 123123123 | 搜索货号 |
- 返回示例
```
{
	code: 200,
	message: "ok",
	data: [
		{
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
		},
		...
	],
}
```


### 新增商品
- URL：`/goods/`
- 请求方法：`POST`
- 请求参数：
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| productCode | string |  是  | 无 | 衣服货号 |
| productStyleCode | string |  是  | 无 | 衣服款号 |
| name | string |  是  | 无 | 衣服名字 |
| brand | int |  是  | 无 | 衣服品牌 |
| sex | int |  是  | 无 | 适合性别：0 男孩 1 女孩 2 无 |
| category | int |  是  | 无 | 衣服大类码 |
| categorySub | int |  是  | 无 | 衣服子类码 |
| season| int |  是  | 无 | 季节码 |
| style | Array |  是  | 无 | 衣服风格码 |
| atom| Array |  是  | 无 | 衣服元素码 |
| color | Array |  是  | 无 | 衣服颜色码 |
| price | float |  是  | 无 | 衣服价格 |
| fabric | string-json-object |  是  | 无 | 衣服面料 |
| pic | string |  是  | 无 | 衣服面料 |
| simplePic | string |  是  | 无 | 衣服面料 |
| atomPic | string |  是  | 无 | 衣服面料 |
- 返回示例：
```
{
  "code": 200,
  "message": "ok",
  "data": int 新商品的唯一id
}
```

### 查询某商品
- URL：`/goods/<goods_id>/`
- 请求方法：`GET`
- URL参数：
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| goods_id | Int |  是  | 1234 | 商品的唯一Id |
- 返回示例
```
{
	code: 200,
	message: "ok",
	data: {
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
	},
}
```

### 修改商品
- URL：`/goods/<goods_id>/`
- 请求方法：`PUT`
- URL参数：
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| goods_id | Int |  是  | 1234 | 商品的唯一Id |
- 请求参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| cloth | Cloth类 |  是  | 无 | 上传一个cloth类，所有参数不必须 |

### 移除商品
- URL：`/goods/<goods_id>/`
- 请求方法：`DELET`
- URL参数：
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| goods_id | Int |  是  | 1234 | 商品的唯一Id |

## 暂时接口

### 查询用户主要信息
- URL`/member/brief/<member_id>/`
- 请求方法：`GET`
- URL参数
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| member_id    |   int |  是  | 123 | 用户的唯一id |
- Data（返回数据）
| 参数名      |     类型 |   是否必须   | 示例 | 描述 |
| :-------- | --------:| :------: |
| member_id |   int |  是  | 123 | 用户的唯一id |
|  babys |  json-Array  |  是  | [{id: 123,name: "王宝宝", weight: 123, height: 123}, {...}] | 此用户的宝宝简单信息组成的数组 |
|  defaultAddress |  json-Object  |  是  | {province: "", city: "", district: "", addr: ""} | 此用户的默认地址 |

## 未确定接口

### 物流接口

### 支付接口

#### 请求微信支付

#### 请求支付宝支付