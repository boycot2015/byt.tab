import { apiUrl, baseUrl } from '~api/baseUrl';
export const data = {
    "code": 200,
    "message": "获取成功，开源地址 https://github.com/vikiboss/60s，反馈群 595941841",
    "data": {
        "location": {
            "name": "广东深圳市",
            "province": "广东省",
            "city": "深圳市市",
            "county": ""
        },
        "weather": {
            "condition": "晴",
            "condition_code": "00",
            "temperature": 23,
            "humidity": 25,
            "pressure": 1009,
            "precipitation": 0,
            "wind_direction": "北风",
            "wind_power": "4-5",
            "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/bigIcon/baitian/00.png",
            "weather_colors": [
                "#4891FF",
                "#9AD2F9",
                "#ADD3ED"
            ],
            "updated": "2025-11-25 15:00:00",
            "updated_at": 1764082800000
        },
        "air_quality": {
            "aqi": 44,
            "level": 1,
            "quality": "优",
            "pm25": 19,
            "pm10": 44,
            "co": 0.5,
            "no2": 10,
            "o3": 119,
            "so2": 8,
            "rank": 155,
            "total_cities": 375,
            "updated": "2025-11-25 14:00:00",
            "updated_at": 1764079200000
        },
        "sunrise": {
            "sunrise": "2025-11-25 06:42:00",
            "sunrise_at": 1764052920000,
            "sunrise_desc": "06:42",
            "sunset": "2025-11-25 17:39:00",
            "sunset_at": 1764092340000,
            "sunset_desc": "17:39"
        },
        "life_indices": [
            {
                "key": "airconditioner",
                "name": "空调开启",
                "level": "较少开启",
                "description": "您将感到很舒适，一般不需要开启空调。"
            },
            {
                "key": "allergy",
                "name": "过敏",
                "level": "较易发",
                "description": "天气条件较易诱发过敏，宜穿长衣长裤，远离过敏源，适当佩戴眼镜和口罩。"
            },
            {
                "key": "carwash",
                "name": "洗车",
                "level": "适宜",
                "description": "适宜洗车，至少可维持5天"
            },
            {
                "key": "chill",
                "name": "风寒",
                "level": "无",
                "description": "温度未达到风寒所需的低温，稍作防寒准备即可。"
            },
            {
                "key": "clothes",
                "name": "穿衣",
                "level": "舒适",
                "description": "建议着长袖T恤、衬衫加单裤等服装。年老体弱者宜着针织长袖衬衫、马甲和长裤。"
            },
            {
                "key": "cold",
                "name": "感冒",
                "level": "少发",
                "description": "各项气象条件适宜，无明显降温过程，发生感冒机率较低。"
            },
            {
                "key": "comfort",
                "name": "舒适度",
                "level": "舒适",
                "description": "白天温度适宜，风力不大，相信您在这样的天气条件下，应会感到比较清爽和舒适。"
            },
            {
                "key": "diffusion",
                "name": "空气污染扩散条件",
                "level": "中",
                "description": "气象条件对空气污染物稀释、扩散和清除无明显影响。"
            },
            {
                "key": "dry",
                "name": "路况",
                "level": "干燥",
                "description": "天气较好，路面比较干燥，路况较好。"
            },
            {
                "key": "drying",
                "name": "晾晒",
                "level": "适宜",
                "description": "天气不错，适宜晾晒。赶紧把久未见阳光的衣物搬出来吸收一下太阳的味道吧！"
            },
            {
                "key": "fish",
                "name": "钓鱼",
                "level": "适宜",
                "description": "天气条件适宜垂钓，愿您度过愉快的垂钓时光。"
            },
            {
                "key": "heatstroke",
                "name": "中暑",
                "level": "无中暑风险",
                "description": "天气不热，在炎炎夏日中十分难得，可以告别暑气漫漫啦~"
            },
            {
                "key": "makeup",
                "name": "化妆",
                "level": "防晒",
                "description": "温湿适宜，但最好使用SPF15以上防晒霜打底，建议使用中性保湿型化妆品。"
            },
            {
                "key": "mood",
                "name": "心情",
                "level": "好",
                "description": "天气较好，空气温润，和风飘飘，美好的天气会带来一天接踵而来的好心情。"
            },
            {
                "key": "morning",
                "name": "晨练",
                "level": "适宜",
                "description": "天气不错，空气清新。"
            },
            {
                "key": "sports",
                "name": "运动",
                "level": "适宜",
                "description": "天气较好，赶快投身大自然参与户外运动，尽情感受运动的快乐吧。"
            },
            {
                "key": "sunglasses",
                "name": "太阳镜",
                "level": "必要",
                "description": "白天天气晴朗，太阳辐射较强，建议佩戴透射比1级且标注UV380-UV400的遮阳镜"
            },
            {
                "key": "sunscreen",
                "name": "防晒",
                "level": "强",
                "description": "属强紫外辐射天气，应加强防护，建议涂擦SPF在15-20之间，PA++的防晒护肤品。"
            },
            {
                "key": "tourism",
                "name": "旅游",
                "level": "适宜",
                "description": "天气较好，温度适宜，是个好天气哦。这样的天气适宜旅游，您可以尽情地享受大自然的风光。"
            },
            {
                "key": "traffic",
                "name": "交通",
                "level": "良好",
                "description": "天气较好，路面干燥，交通气象条件良好，车辆可以正常行驶。"
            },
            {
                "key": "ultraviolet",
                "name": "紫外线强度",
                "level": "强",
                "description": "紫外线辐射强，建议涂擦SPF20左右、PA++的防晒护肤品。避免在10点至14点暴露于日光下。"
            },
            {
                "key": "umbrella",
                "name": "雨伞",
                "level": "不带伞",
                "description": "天气较好，您在出门的时候无须带雨伞。"
            }
        ],
        "alerts": [],
        "hourly_forecast": [
            {
                "datetime": "2025-11-25 14:00",
                "temperature": 23,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-25 15:00",
                "temperature": 23,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-25 16:00",
                "temperature": 23,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-25 17:00",
                "temperature": 22,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-25 18:00",
                "temperature": 21,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-25 19:00",
                "temperature": 21,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-25 20:00",
                "temperature": 21,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-25 21:00",
                "temperature": 20,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-25 22:00",
                "temperature": 19,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-25 23:00",
                "temperature": 19,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-26 00:00",
                "temperature": 18,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-26 01:00",
                "temperature": 17,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-26 02:00",
                "temperature": 16,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-26 03:00",
                "temperature": 16,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-26 04:00",
                "temperature": 16,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-26 05:00",
                "temperature": 16,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-26 06:00",
                "temperature": 16,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-26 07:00",
                "temperature": 16,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-26 08:00",
                "temperature": 16,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-26 09:00",
                "temperature": 17,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-26 10:00",
                "temperature": 18,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-26 11:00",
                "temperature": 19,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-26 12:00",
                "temperature": 20,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-26 13:00",
                "temperature": 22,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-26 14:00",
                "temperature": 22,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-26 15:00",
                "temperature": 22,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-26 16:00",
                "temperature": 21,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-26 17:00",
                "temperature": 20,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-26 18:00",
                "temperature": 19,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-26 19:00",
                "temperature": 19,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-26 20:00",
                "temperature": 19,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-26 21:00",
                "temperature": 18,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-26 22:00",
                "temperature": 18,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-26 23:00",
                "temperature": 18,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-27 00:00",
                "temperature": 17,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-27 01:00",
                "temperature": 17,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-27 02:00",
                "temperature": 17,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-27 03:00",
                "temperature": 16,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-27 04:00",
                "temperature": 16,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-27 05:00",
                "temperature": 16,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-27 06:00",
                "temperature": 16,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "datetime": "2025-11-27 07:00",
                "temperature": 16,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-27 08:00",
                "temperature": 16,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-27 09:00",
                "temperature": 17,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-27 10:00",
                "temperature": 19,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-27 11:00",
                "temperature": 22,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-27 12:00",
                "temperature": 23,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            },
            {
                "datetime": "2025-11-27 13:00",
                "temperature": 24,
                "condition": "晴",
                "condition_code": "00",
                "wind_direction": "东北风",
                "wind_power": "1-3",
                "weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png"
            }
        ],
        "daily_forecast": [
            {
                "date": "2025-11-24",
                "day_condition": "阴",
                "day_condition_code": "02",
                "night_condition": "晴",
                "night_condition_code": "00",
                "max_temperature": 26,
                "min_temperature": 17,
                "day_wind_direction": "北风",
                "day_wind_power": "1-3",
                "night_wind_direction": "北风",
                "night_wind_power": "3-4",
                "aqi": 76,
                "aqi_level": 2,
                "air_quality": "良",
                "day_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/02.png",
                "night_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "date": "2025-11-25",
                "day_condition": "晴",
                "day_condition_code": "00",
                "night_condition": "晴",
                "night_condition_code": "00",
                "max_temperature": 24,
                "min_temperature": 16,
                "day_wind_direction": "微风",
                "day_wind_power": "1-3",
                "night_wind_direction": "微风",
                "night_wind_power": "1-3",
                "aqi": 44,
                "aqi_level": 1,
                "air_quality": "优",
                "day_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png",
                "night_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "date": "2025-11-26",
                "day_condition": "晴",
                "day_condition_code": "00",
                "night_condition": "晴",
                "night_condition_code": "00",
                "max_temperature": 23,
                "min_temperature": 16,
                "day_wind_direction": "微风",
                "day_wind_power": "1-3",
                "night_wind_direction": "微风",
                "night_wind_power": "1-3",
                "aqi": 63,
                "aqi_level": 2,
                "air_quality": "良",
                "day_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png",
                "night_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "date": "2025-11-27",
                "day_condition": "晴",
                "day_condition_code": "00",
                "night_condition": "晴",
                "night_condition_code": "00",
                "max_temperature": 24,
                "min_temperature": 14,
                "day_wind_direction": "微风",
                "day_wind_power": "1-3",
                "night_wind_direction": "微风",
                "night_wind_power": "1-3",
                "aqi": 106,
                "aqi_level": 3,
                "air_quality": "轻度污染",
                "day_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png",
                "night_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "date": "2025-11-28",
                "day_condition": "晴",
                "day_condition_code": "00",
                "night_condition": "晴",
                "night_condition_code": "00",
                "max_temperature": 21,
                "min_temperature": 14,
                "day_wind_direction": "微风",
                "day_wind_power": "1-3",
                "night_wind_direction": "微风",
                "night_wind_power": "1-3",
                "aqi": 106,
                "aqi_level": 3,
                "air_quality": "轻度污染",
                "day_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/00.png",
                "night_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/00.png"
            },
            {
                "date": "2025-11-29",
                "day_condition": "多云",
                "day_condition_code": "01",
                "night_condition": "多云",
                "night_condition_code": "01",
                "max_temperature": 24,
                "min_temperature": 15,
                "day_wind_direction": "微风",
                "day_wind_power": "1-3",
                "night_wind_direction": "微风",
                "night_wind_power": "1-3",
                "aqi": 102,
                "aqi_level": 3,
                "air_quality": "轻度污染",
                "day_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/01.png",
                "night_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/01.png"
            },
            {
                "date": "2025-11-30",
                "day_condition": "多云",
                "day_condition_code": "01",
                "night_condition": "多云",
                "night_condition_code": "01",
                "max_temperature": 24,
                "min_temperature": 16,
                "day_wind_direction": "微风",
                "day_wind_power": "1-3",
                "night_wind_direction": "微风",
                "night_wind_power": "1-3",
                "aqi": 55,
                "aqi_level": 2,
                "air_quality": "良",
                "day_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/baitian/01.png",
                "night_weather_icon": "https://mat1.gtimg.com/qqcdn/xw/tianqi/smallIcon/heiye/01.png"
            }
        ],
        "sunrise_sunset": [
            {
                "sunrise": "2025-11-25 06:42:00",
                "sunrise_at": 1764052920000,
                "sunrise_desc": "06:42",
                "sunset": "2025-11-25 17:39:00",
                "sunset_at": 1764092340000,
                "sunset_desc": "17:39"
            },
            {
                "sunrise": "2025-11-26 06:43:00",
                "sunrise_at": 1764139380000,
                "sunrise_desc": "06:43",
                "sunset": "2025-11-26 17:39:00",
                "sunset_at": 1764178740000,
                "sunset_desc": "17:39"
            },
            {
                "sunrise": "2025-11-27 06:43:00",
                "sunrise_at": 1764225780000,
                "sunrise_desc": "06:43",
                "sunset": "2025-11-27 17:38:00",
                "sunset_at": 1764265080000,
                "sunset_desc": "17:38"
            },
            {
                "sunrise": "2025-11-28 06:44:00",
                "sunrise_at": 1764312240000,
                "sunrise_desc": "06:44",
                "sunset": "2025-11-28 17:38:00",
                "sunset_at": 1764351480000,
                "sunset_desc": "17:38"
            },
            {
                "sunrise": "2025-11-29 06:45:00",
                "sunrise_at": 1764398700000,
                "sunrise_desc": "06:45",
                "sunset": "2025-11-29 17:39:00",
                "sunset_at": 1764437940000,
                "sunset_desc": "17:39"
            },
            {
                "sunrise": "2025-11-30 06:45:00",
                "sunrise_at": 1764485100000,
                "sunrise_desc": "06:45",
                "sunset": "2025-11-30 17:39:00",
                "sunset_at": 1764524340000,
                "sunset_desc": "17:39"
            },
            {
                "sunrise": "2025-12-01 06:46:00",
                "sunrise_at": 1764571560000,
                "sunrise_desc": "06:46",
                "sunset": "2025-12-01 17:39:00",
                "sunset_at": 1764610740000,
                "sunset_desc": "17:39"
            }
        ]
    }
}
const getIP = async (req?: Request): Promise<{ ip: string, location: string, province?: string, city?: string, district?: string }> => {
    try {
        let proxyUrl = `${baseUrl}/cors?url=`
        let body = await fetch('https://www.ip.cn/').then(response => response.text()).then(data => data)
        let ticket = body.match(/\_ticket = ([^&]+)/)?.[1]?.split(';')[0].replace(/"/g, '')
        let url = 'https://my.ip.cn/json/?ticket=' + ticket
        // let url2 = 'https://api.ipify.org?format=json'
        // console.log(ticket, 'ticket');
        return fetch(url).then(response => response.json()).then(data => data.data || data)
            .then(data => {
                return {
                    ip: data.query || data.ip,
                    province: data?.province || data?.regionName,
                    city: data?.city,
                    district: data?.district,
                    location: [data?.province || data?.regionName, data?.city, data?.district].filter(el => el).join(' '),
                };
            }).catch(err => {
                return {
                    ip: '127.0.0.1',
                    location: '深圳市',
                }
            })
    } catch (error) {
        return {
            ip: '127.0.0.1',
            location: '深圳市',
        }
    }
}
const getWeather = async (city?: string) => {
    if (!city) {
        let { ip, location, city: CT, district } = await getIP()
        if (district && district.includes('南山') && CT.includes('深圳市')) {
            district = '深圳市'
        }
        city = district || CT || '深圳市'
    }
    const response = await fetch(`${apiUrl}/weather?query=${city}`);
    const data = await response.json();
    let res2 = await getWeatherForecast(city)
    return { ...res2, ...data.data };
};
const getWeatherForecast = async (city?: string) => {
    if (!city) {
        let { ip, location, city: CT, district } = await getIP()
        if (district && district.includes('南山') && CT.includes('深圳市')) {
            district = '深圳市'
        }
        city = district || CT || '深圳市'
    }
    const response = await fetch(`${apiUrl}/weather/forecast?query=${city || '深圳市'}`);
    const data = await response.json();
    return data.data;
};

export const weatherIcon: Record<string, string> = {
    '晴': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.37 14.62c0-.24.08-.45.25-.62c.17-.16.38-.24.6-.24h2.04c.23 0 .42.08.58.25c.15.17.23.37.23.61s-.07.44-.22.61s-.35.25-.58.25H5.23c-.23 0-.43-.08-.6-.25a.83.83 0 0 1-.26-.61m2.86 6.93c0-.23.08-.43.23-.61l1.47-1.43c.15-.16.35-.23.59-.23s.44.08.6.23s.24.34.24.57c0 .24-.08.46-.24.64L8.7 22.14q-.615.48-1.23 0a.8.8 0 0 1-.24-.59m0-13.84c0-.23.08-.43.23-.61c.2-.17.41-.25.64-.25c.22 0 .42.08.59.24l1.43 1.47c.16.15.24.35.24.59q0 .36-.24.6c-.24.24-.36.24-.6.24s-.44-.08-.59-.24L7.47 8.32a.84.84 0 0 1-.24-.61m2.55 6.91c0-.93.23-1.8.7-2.6s1.1-1.44 1.91-1.91s1.67-.7 2.6-.7c.7 0 1.37.14 2.02.42c.64.28 1.2.65 1.66 1.12c.47.47.84 1.02 1.11 1.66s.41 1.32.41 2.02c0 .94-.23 1.81-.7 2.61s-1.1 1.43-1.9 1.9s-1.67.7-2.61.7s-1.81-.23-2.61-.7s-1.43-1.1-1.9-1.9c-.45-.81-.69-1.68-.69-2.62m1.7 0c0 .98.34 1.81 1.03 2.5c.68.69 1.51 1.04 2.49 1.04s1.81-.35 2.5-1.04s1.04-1.52 1.04-2.5c0-.96-.35-1.78-1.04-2.47c-.69-.68-1.52-1.02-2.5-1.02c-.97 0-1.8.34-2.48 1.02c-.7.69-1.04 1.51-1.04 2.47m2.66 7.78c0-.24.08-.44.25-.6s.37-.24.6-.24c.24 0 .45.08.61.24s.24.36.24.6v1.99c0 .24-.08.45-.25.62s-.37.25-.6.25s-.44-.08-.6-.25a.85.85 0 0 1-.25-.62zm0-15.5V4.86c0-.23.08-.43.25-.6S14.76 4 15 4s.43.08.6.25s.25.37.25.6V6.9c0 .23-.08.42-.25.58s-.37.23-.6.23s-.44-.08-.6-.23s-.26-.35-.26-.58m5.52 13.18c0-.23.08-.42.23-.56c.15-.16.34-.23.56-.23c.24 0 .44.08.6.23l1.46 1.43c.16.17.24.38.24.61s-.08.43-.24.59q-.6.465-1.2 0l-1.42-1.42a.97.97 0 0 1-.23-.65m0-10.92c0-.25.08-.45.23-.59l1.42-1.47a.84.84 0 0 1 .59-.24c.24 0 .44.08.6.25c.17.17.25.37.25.6c0 .25-.08.46-.24.62l-1.46 1.43q-.27.24-.6.24c-.23 0-.41-.08-.56-.24s-.23-.36-.23-.6m2.26 5.46c0-.24.08-.44.24-.62q.24-.24.57-.24h2.02c.23 0 .43.09.6.26s.26.37.26.6s-.09.43-.26.6s-.37.25-.6.25h-2.02c-.23 0-.43-.08-.58-.25s-.23-.36-.23-.6"/></svg>',
    '晴转多云': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M1.56 16.9q0 1.35.66 2.49c.66 1.14 1.04 1.36 1.8 1.8s1.58.66 2.47.66h10.83c.89 0 1.72-.22 2.48-.66s1.37-1.04 1.81-1.8s.67-1.59.67-2.49c0-.66-.14-1.33-.42-2c.76-.92 1.14-2.03 1.14-3.3c0-.71-.14-1.39-.41-2.04s-.65-1.2-1.12-1.67s-1.02-.85-1.67-1.12c-.65-.28-1.33-.41-2.04-.41c-1.48 0-2.77.58-3.88 1.74q-1.155-.66-2.7-.66c-1.41 0-2.65.44-3.73 1.31a5.8 5.8 0 0 0-2.08 3.35c-1.12.26-2.03.83-2.74 1.73s-1.07 1.92-1.07 3.07m1.71 0c0-.84.28-1.56.84-2.17s1.26-.96 2.1-1.06l.5-.03c.12 0 .19-.06.19-.18l.07-.54c.14-1.08.61-1.99 1.41-2.71c.8-.73 1.74-1.09 2.81-1.09c1.1 0 2.06.37 2.87 1.1a4 4 0 0 1 1.37 2.71l.07.58c.02.11.09.17.21.17h1.61q1.32 0 2.28.96c.64.64.96 1.39.96 2.27c0 .91-.32 1.68-.95 2.32s-1.4.96-2.28.96H6.49c-.88 0-1.63-.32-2.27-.97c-.63-.65-.95-1.42-.95-2.32m6.7-12.27q0 .36.24.63l.66.64c.25.19.46.27.64.25c.21 0 .39-.09.55-.26s.24-.38.24-.62s-.09-.44-.26-.59l-.59-.66a.9.9 0 0 0-.61-.24c-.24 0-.45.08-.62.25c-.17.16-.25.36-.25.6m5.34 4.43c.69-.67 1.51-1 2.45-1c.99 0 1.83.34 2.52 1.03s1.04 1.52 1.04 2.51c0 .62-.17 1.24-.51 1.84c-.97-.96-2.13-1.44-3.49-1.44H17c-.25-1.09-.81-2.07-1.69-2.94m1.63-5.28c0 .26.08.46.23.62s.35.23.59.23c.26 0 .46-.08.62-.23c.16-.16.23-.36.23-.62V1.73c0-.24-.08-.43-.24-.59s-.36-.23-.61-.23c-.24 0-.43.08-.59.23s-.23.35-.23.59zm5.52 2.29c0 .26.07.46.22.62c.21.16.42.24.62.24c.18 0 .38-.08.59-.24l1.43-1.43c.16-.18.24-.39.24-.64q0-.36-.24-.6a.8.8 0 0 0-.59-.24c-.24 0-.43.08-.58.24l-1.47 1.43c-.15.19-.22.39-.22.62m.79 11.84c0 .24.08.45.25.63l.65.63c.15.16.34.24.58.24s.44-.08.6-.25a.86.86 0 0 0 .24-.62c0-.22-.08-.42-.24-.58l-.65-.65a.78.78 0 0 0-.57-.24q-.36 0-.6.24c-.17.16-.26.36-.26.6m1.47-6.31c0 .23.09.42.26.58c.16.16.37.24.61.24h2.04c.23 0 .42-.08.58-.23s.23-.35.23-.59s-.08-.44-.23-.6s-.35-.25-.58-.25h-2.04c-.24 0-.44.08-.61.25a.8.8 0 0 0-.26.6"/></svg>',
    '多云': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M1.56 16.9q0 1.35.66 2.49c.66 1.14 1.04 1.36 1.8 1.8s1.58.66 2.47.66h10.83c.89 0 1.72-.22 2.48-.66s1.37-1.04 1.81-1.8s.67-1.59.67-2.49c0-.66-.14-1.33-.42-2c.76-.92 1.14-2.03 1.14-3.3c0-.71-.14-1.39-.41-2.04s-.65-1.2-1.12-1.67s-1.02-.85-1.67-1.12c-.65-.28-1.33-.41-2.04-.41c-1.48 0-2.77.58-3.88 1.74q-1.155-.66-2.7-.66c-1.41 0-2.65.44-3.73 1.31a5.8 5.8 0 0 0-2.08 3.35c-1.12.26-2.03.83-2.74 1.73s-1.07 1.92-1.07 3.07m1.71 0c0-.84.28-1.56.84-2.17s1.26-.96 2.1-1.06l.5-.03c.12 0 .19-.06.19-.18l.07-.54c.14-1.08.61-1.99 1.41-2.71c.8-.73 1.74-1.09 2.81-1.09c1.1 0 2.06.37 2.87 1.1a4 4 0 0 1 1.37 2.71l.07.58c.02.11.09.17.21.17h1.61q1.32 0 2.28.96c.64.64.96 1.39.96 2.27c0 .91-.32 1.68-.95 2.32s-1.4.96-2.28.96H6.49c-.88 0-1.63-.32-2.27-.97c-.63-.65-.95-1.42-.95-2.32m6.7-12.27q0 .36.24.63l.66.64c.25.19.46.27.64.25c.21 0 .39-.09.55-.26s.24-.38.24-.62s-.09-.44-.26-.59l-.59-.66a.9.9 0 0 0-.61-.24c-.24 0-.45.08-.62.25c-.17.16-.25.36-.25.6m5.34 4.43c.69-.67 1.51-1 2.45-1c.99 0 1.83.34 2.52 1.03s1.04 1.52 1.04 2.51c0 .62-.17 1.24-.51 1.84c-.97-.96-2.13-1.44-3.49-1.44H17c-.25-1.09-.81-2.07-1.69-2.94m1.63-5.28c0 .26.08.46.23.62s.35.23.59.23c.26 0 .46-.08.62-.23c.16-.16.23-.36.23-.62V1.73c0-.24-.08-.43-.24-.59s-.36-.23-.61-.23c-.24 0-.43.08-.59.23s-.23.35-.23.59zm5.52 2.29c0 .26.07.46.22.62c.21.16.42.24.62.24c.18 0 .38-.08.59-.24l1.43-1.43c.16-.18.24-.39.24-.64q0-.36-.24-.6a.8.8 0 0 0-.59-.24c-.24 0-.43.08-.58.24l-1.47 1.43c-.15.19-.22.39-.22.62m.79 11.84c0 .24.08.45.25.63l.65.63c.15.16.34.24.58.24s.44-.08.6-.25a.86.86 0 0 0 .24-.62c0-.22-.08-.42-.24-.58l-.65-.65a.78.78 0 0 0-.57-.24q-.36 0-.6.24c-.17.16-.26.36-.26.6m1.47-6.31c0 .23.09.42.26.58c.16.16.37.24.61.24h2.04c.23 0 .42-.08.58-.23s.23-.35.23-.59s-.08-.44-.23-.6s-.35-.25-.58-.25h-2.04c-.24 0-.44.08-.61.25a.8.8 0 0 0-.26.6"/></svg>',
    '阴': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M3.89 17.6c0-.99.31-1.88.93-2.65s1.41-1.27 2.38-1.49c.26-1.17.85-2.14 1.78-2.88c.93-.75 2-1.12 3.22-1.12c1.18 0 2.24.36 3.16 1.09c.93.73 1.53 1.66 1.8 2.8h.27c1.18 0 2.18.41 3.01 1.24s1.25 1.83 1.25 3c0 1.18-.42 2.18-1.25 3.01s-1.83 1.25-3.01 1.25H8.16c-.58 0-1.13-.11-1.65-.34s-.99-.51-1.37-.89s-.68-.84-.91-1.36s-.34-1.09-.34-1.66m1.45 0c0 .76.28 1.42.82 1.96s1.21.82 1.99.82h9.28c.77 0 1.44-.27 1.99-.82s.83-1.2.83-1.96s-.27-1.42-.83-1.96c-.55-.54-1.21-.82-1.99-.82h-1.39q-.15 0-.15-.15l-.07-.49c-.1-.94-.5-1.73-1.19-2.35s-1.51-.93-2.45-.93s-1.76.31-2.46.94c-.7.62-1.09 1.41-1.18 2.34l-.07.42c0 .1-.05.15-.16.15l-.45.07c-.72.06-1.32.36-1.81.89c-.46.53-.71 1.16-.71 1.89m8.85-8.72c-.1.09-.08.16.07.21c.43.19.79.37 1.08.55c.11.03.19.02.22-.03c.61-.57 1.31-.86 2.12-.86s1.5.27 2.1.81c.59.54.92 1.21.99 2l.09.64h1.42c.65 0 1.21.23 1.68.7s.7 1.02.7 1.66c0 .6-.21 1.12-.62 1.57s-.92.7-1.53.77c-.1 0-.15.05-.15.16v1.13c0 .11.05.16.15.16c1.01-.06 1.86-.46 2.55-1.19s1.04-1.6 1.04-2.6c0-1.06-.37-1.96-1.12-2.7c-.75-.75-1.65-1.12-2.7-1.12h-.15c-.26-1-.81-1.82-1.65-2.47c-.83-.65-1.77-.97-2.8-.97c-1.4-.01-2.57.52-3.49 1.58"/></svg>',
    '雨': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.64 16.91c0-1.15.36-2.17 1.08-3.07a4.82 4.82 0 0 1 2.73-1.73c.31-1.36 1.02-2.48 2.11-3.36s2.34-1.31 3.75-1.31c1.38 0 2.6.43 3.68 1.28s1.78 1.95 2.1 3.29h.32c.89 0 1.72.22 2.48.65s1.37 1.03 1.81 1.78s.67 1.58.67 2.47c0 .88-.21 1.69-.63 2.44s-1 1.35-1.73 1.8s-1.53.69-2.4.71c-.13 0-.2-.06-.2-.17v-1.33c0-.12.07-.18.2-.18c.85-.04 1.58-.38 2.18-1.02s.9-1.39.9-2.26s-.33-1.62-.98-2.26s-1.42-.96-2.31-.96h-1.61c-.12 0-.18-.06-.18-.17l-.08-.58a4.08 4.08 0 0 0-1.39-2.71c-.82-.73-1.76-1.09-2.85-1.09s-2.05.36-2.85 1.09a4.02 4.02 0 0 0-1.36 2.71l-.07.53c0 .12-.07.19-.2.19l-.53.03c-.83.1-1.53.46-2.1 1.07s-.85 1.33-.85 2.16c0 .87.3 1.62.9 2.26s1.33.98 2.18 1.02c.11 0 .17.06.17.18v1.33c0 .11-.06.17-.17.17c-1.34-.06-2.47-.57-3.4-1.53s-1.37-2.1-1.37-3.43m5.35 6.69c0-.04.01-.11.04-.2l1.63-5.77a.837.837 0 0 1 1.02-.56c.24.04.42.17.54.37s.15.42.08.67l-1.63 5.73c-.12.43-.4.64-.82.64c-.04 0-.07-.01-.11-.02c-.06-.02-.09-.03-.1-.03a.83.83 0 0 1-.49-.33a.9.9 0 0 1-.16-.5m2.62 2.81l2.44-8.77c.04-.19.14-.34.3-.44s.32-.15.49-.15q.135 0 .27.03c.22.06.38.19.49.39s.13.41.07.64l-2.43 8.78c-.04.17-.13.31-.29.43s-.32.18-.51.18c-.09 0-.18-.02-.25-.05c-.2-.05-.37-.18-.52-.39c-.11-.18-.13-.39-.06-.65m4.13-2.79c0-.04.01-.11.04-.23l1.63-5.77a.83.83 0 0 1 .3-.44c.15-.1.3-.15.46-.15c.08 0 .17.01.26.03c.21.06.36.16.46.31s.15.31.15.47c0 .03-.01.08-.02.14s-.02.1-.02.12l-1.63 5.73c-.04.19-.13.35-.28.46s-.32.17-.51.17l-.24-.05a.8.8 0 0 1-.46-.32a.9.9 0 0 1-.14-.47"/></svg>',
    '小雨': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.64 16.91c0-1.15.36-2.17 1.08-3.07a4.82 4.82 0 0 1 2.73-1.73c.31-1.36 1.02-2.48 2.11-3.36s2.34-1.31 3.75-1.31c1.38 0 2.6.43 3.68 1.28s1.78 1.95 2.1 3.29h.32c.89 0 1.72.22 2.48.65s1.37 1.03 1.81 1.78s.67 1.58.67 2.47c0 .88-.21 1.69-.63 2.44s-1 1.35-1.73 1.8s-1.53.69-2.4.71c-.13 0-.2-.06-.2-.17v-1.33c0-.12.07-.18.2-.18c.85-.04 1.58-.38 2.18-1.02s.9-1.39.9-2.26s-.33-1.62-.98-2.26s-1.42-.96-2.31-.96h-1.61c-.12 0-.18-.06-.18-.17l-.08-.58a4.08 4.08 0 0 0-1.39-2.71c-.82-.73-1.76-1.09-2.85-1.09s-2.05.36-2.85 1.09a4.02 4.02 0 0 0-1.36 2.71l-.07.53c0 .12-.07.19-.2.19l-.53.03c-.83.1-1.53.46-2.1 1.07s-.85 1.33-.85 2.16c0 .87.3 1.62.9 2.26s1.33.98 2.18 1.02c.11 0 .17.06.17.18v1.33c0 .11-.06.17-.17.17c-1.34-.06-2.47-.57-3.4-1.53s-1.37-2.1-1.37-3.43m5.35 6.69c0-.04.01-.11.04-.2l1.63-5.77a.837.837 0 0 1 1.02-.56c.24.04.42.17.54.37s.15.42.08.67l-1.63 5.73c-.12.43-.4.64-.82.64c-.04 0-.07-.01-.11-.02c-.06-.02-.09-.03-.1-.03a.83.83 0 0 1-.49-.33a.9.9 0 0 1-.16-.5m2.62 2.81l2.44-8.77c.04-.19.14-.34.3-.44s.32-.15.49-.15q.135 0 .27.03c.22.06.38.19.49.39s.13.41.07.64l-2.43 8.78c-.04.17-.13.31-.29.43s-.32.18-.51.18c-.09 0-.18-.02-.25-.05c-.2-.05-.37-.18-.52-.39c-.11-.18-.13-.39-.06-.65m4.13-2.79c0-.04.01-.11.04-.23l1.63-5.77a.83.83 0 0 1 .3-.44c.15-.1.3-.15.46-.15c.08 0 .17.01.26.03c.21.06.36.16.46.31s.15.31.15.47c0 .03-.01.08-.02.14s-.02.1-.02.12l-1.63 5.73c-.04.19-.13.35-.28.46s-.32.17-.51.17l-.24-.05a.8.8 0 0 1-.46-.32a.9.9 0 0 1-.14-.47"/></svg>',
    '小到中雨': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.63 16.93c0 1.12.33 2.11.98 2.99c.65.87 1.5 1.47 2.55 1.79c.09.02.17-.01.24-.08l1.16-1.43q-1.335 0-2.28-.96c-.63-.64-.95-1.41-.95-2.31c0-.84.28-1.58.84-2.2s1.26-.97 2.1-1.04l.53-.07c.11 0 .16-.04.16-.13l.08-.55c.12-1.1.59-2.01 1.39-2.73s1.75-1.08 2.85-1.08s2.06.36 2.87 1.09c.82.73 1.27 1.64 1.37 2.72l.07.58c.02.11.1.17.22.17h1.62c.9 0 1.67.32 2.3.95s.95 1.39.95 2.29c0 .83-.28 1.56-.84 2.18s-1.25.98-2.07 1.08c-.12 0-.28.02-.49.06c-.19.02-.33.09-.41.23l-2.36 2.79a.78.78 0 0 0-.16.63c.03.24.14.43.31.57c.11.12.29.19.56.19c.26 0 .47-.12.61-.35l2.12-2.44c1.24-.13 2.29-.66 3.15-1.61s1.28-2.06 1.28-3.33c0-.67-.13-1.32-.39-1.93a5 5 0 0 0-1.05-1.58a5 5 0 0 0-1.58-1.05a4.9 4.9 0 0 0-1.93-.39h-.32c-.33-1.32-1.04-2.41-2.12-3.26s-2.32-1.27-3.72-1.27c-.93 0-1.81.2-2.63.6S10.13 9 9.56 9.71s-.94 1.52-1.13 2.42c-1.12.25-2.04.82-2.75 1.72c-.7.89-1.05 1.92-1.05 3.08m3.38 8.02q0 .09.06.3c.09.21.23.36.44.44c.22.1.44.11.67.02a.76.76 0 0 0 .46-.45c.1-.22.11-.43.02-.65a.73.73 0 0 0-.46-.43a.75.75 0 0 0-.65-.03a.85.85 0 0 0-.46.47a.7.7 0 0 0-.08.33m1.85-2.44v.1c.02.23.12.41.3.56c.23.13.43.19.62.19c.22 0 .43-.11.61-.33l2.32-2.77c.14-.17.21-.39.2-.66a.8.8 0 0 0-.28-.53c-.16-.14-.33-.22-.52-.22c-.06 0-.1 0-.14.01c-.23.04-.42.15-.56.33l-2.36 2.77c-.13.16-.19.34-.19.55m.77 4.72c0 .12.03.23.08.32c.08.21.23.37.44.47c.11.05.22.07.33.07c.12 0 .23-.02.31-.07c.23-.09.39-.23.47-.41c.1-.22.11-.44.02-.67a.71.71 0 0 0-.45-.46a.82.82 0 0 0-.67-.02q-.345.135-.45.45c-.06.09-.08.2-.08.32m1.67-2.35v.11c.02.22.13.4.31.55s.37.22.55.22c.23 0 .43-.11.63-.33l4.35-5.24c.11-.12.17-.3.17-.52v-.12c-.02-.23-.12-.4-.27-.53s-.33-.2-.52-.2h-.13c-.23.01-.42.12-.55.31l-4.35 5.2c-.14.18-.19.36-.19.55m3.51 1.15q0 .135.06.3c.09.22.24.38.46.47c.14.04.24.06.31.06c.14 0 .26-.03.34-.08c.22-.09.38-.23.46-.42c.1-.17.11-.39.02-.67a.76.76 0 0 0-.44-.44l-.36-.09c-.09.02-.19.04-.32.07c-.22.08-.37.23-.45.44c-.05.13-.08.25-.08.36"/></svg>',
    '中雨': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.63 16.93c0 1.12.33 2.11.98 2.99c.65.87 1.5 1.47 2.55 1.79c.09.02.17-.01.24-.08l1.16-1.43q-1.335 0-2.28-.96c-.63-.64-.95-1.41-.95-2.31c0-.84.28-1.58.84-2.2s1.26-.97 2.1-1.04l.53-.07c.11 0 .16-.04.16-.13l.08-.55c.12-1.1.59-2.01 1.39-2.73s1.75-1.08 2.85-1.08s2.06.36 2.87 1.09c.82.73 1.27 1.64 1.37 2.72l.07.58c.02.11.1.17.22.17h1.62c.9 0 1.67.32 2.3.95s.95 1.39.95 2.29c0 .83-.28 1.56-.84 2.18s-1.25.98-2.07 1.08c-.12 0-.28.02-.49.06c-.19.02-.33.09-.41.23l-2.36 2.79a.78.78 0 0 0-.16.63c.03.24.14.43.31.57c.11.12.29.19.56.19c.26 0 .47-.12.61-.35l2.12-2.44c1.24-.13 2.29-.66 3.15-1.61s1.28-2.06 1.28-3.33c0-.67-.13-1.32-.39-1.93a5 5 0 0 0-1.05-1.58a5 5 0 0 0-1.58-1.05a4.9 4.9 0 0 0-1.93-.39h-.32c-.33-1.32-1.04-2.41-2.12-3.26s-2.32-1.27-3.72-1.27c-.93 0-1.81.2-2.63.6S10.13 9 9.56 9.71s-.94 1.52-1.13 2.42c-1.12.25-2.04.82-2.75 1.72c-.7.89-1.05 1.92-1.05 3.08m3.38 8.02q0 .09.06.3c.09.21.23.36.44.44c.22.1.44.11.67.02a.76.76 0 0 0 .46-.45c.1-.22.11-.43.02-.65a.73.73 0 0 0-.46-.43a.75.75 0 0 0-.65-.03a.85.85 0 0 0-.46.47a.7.7 0 0 0-.08.33m1.85-2.44v.1c.02.23.12.41.3.56c.23.13.43.19.62.19c.22 0 .43-.11.61-.33l2.32-2.77c.14-.17.21-.39.2-.66a.8.8 0 0 0-.28-.53c-.16-.14-.33-.22-.52-.22c-.06 0-.1 0-.14.01c-.23.04-.42.15-.56.33l-2.36 2.77c-.13.16-.19.34-.19.55m.77 4.72c0 .12.03.23.08.32c.08.21.23.37.44.47c.11.05.22.07.33.07c.12 0 .23-.02.31-.07c.23-.09.39-.23.47-.41c.1-.22.11-.44.02-.67a.71.71 0 0 0-.45-.46a.82.82 0 0 0-.67-.02q-.345.135-.45.45c-.06.09-.08.2-.08.32m1.67-2.35v.11c.02.22.13.4.31.55s.37.22.55.22c.23 0 .43-.11.63-.33l4.35-5.24c.11-.12.17-.3.17-.52v-.12c-.02-.23-.12-.4-.27-.53s-.33-.2-.52-.2h-.13c-.23.01-.42.12-.55.31l-4.35 5.2c-.14.18-.19.36-.19.55m3.51 1.15q0 .135.06.3c.09.22.24.38.46.47c.14.04.24.06.31.06c.14 0 .26-.03.34-.08c.22-.09.38-.23.46-.42c.1-.17.11-.39.02-.67a.76.76 0 0 0-.44-.44l-.36-.09c-.09.02-.19.04-.32.07c-.22.08-.37.23-.45.44c-.05.13-.08.25-.08.36"/></svg>',
    '中到大雨': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.65 16.96c0 1.32.47 2.46 1.4 3.41c.93.96 2.06 1.46 3.38 1.5c.12 0 .18-.06.18-.17v-1.33q0-.18-.18-.18c-.84-.04-1.57-.38-2.17-1.02s-.91-1.37-.91-2.22c0-.84.28-1.57.85-2.19s1.26-.97 2.1-1.04l.53-.07c.12 0 .19-.06.19-.18l.07-.5c.1-1.09.55-2.01 1.36-2.75s1.76-1.11 2.86-1.11c1.08 0 2.03.37 2.84 1.1s1.28 1.63 1.4 2.71l.07.58c0 .12.06.18.19.18h1.6c.9 0 1.67.32 2.32.97c.64.64.97 1.41.97 2.3q0 1.26-.9 2.22c-.6.63-1.33.97-2.18 1.02c-.13 0-.2.06-.2.18v1.33c0 .11.07.17.2.17c1.33-.04 2.46-.54 3.38-1.5s1.38-2.09 1.38-3.42c0-.89-.22-1.72-.67-2.48a4.9 4.9 0 0 0-1.81-1.8c-.76-.44-1.59-.66-2.48-.66h-.31A5.9 5.9 0 0 0 18 8.72a5.76 5.76 0 0 0-3.68-1.28c-1.41 0-2.66.44-3.75 1.31s-1.79 1.99-2.1 3.35c-1.13.29-2.04.88-2.75 1.77s-1.07 1.93-1.07 3.09m5.4 7.02c0 .17.05.34.16.51s.27.28.47.35c.23.07.44.06.64-.04c.19-.09.33-.28.39-.56l.14-.61a.853.853 0 0 0-.61-1.03c-.22-.07-.44-.04-.64.08s-.34.3-.4.53l-.14.59c0 .03-.01.09-.01.18m.76-2.9c0 .21.08.4.25.57c.16.17.34.25.56.25q.36 0 .6-.24c.16-.16.24-.35.24-.59c0-.23-.08-.43-.24-.59a.8.8 0 0 0-.6-.24c-.23 0-.42.08-.58.23c-.15.18-.23.38-.23.61m.61-2.27c-.01.16.03.31.14.45c.1.15.26.25.48.32c.21.06.41.04.62-.07s.34-.28.41-.51l.28-.9c.07-.24.05-.46-.07-.65a.9.9 0 0 0-.54-.39a.74.74 0 0 0-.63.07a.85.85 0 0 0-.41.5l-.24.92c0 .02-.01.06-.02.12c-.01.05-.02.1-.02.14m1.17 8.29c0 .18.05.34.15.5q.15.24.48.33c.08.02.17.03.25.03c.43 0 .69-.2.79-.61l.14-.59a.92.92 0 0 0-.08-.68a.77.77 0 0 0-.52-.37a.74.74 0 0 0-.63.07c-.21.12-.34.29-.41.51l-.14.59c-.02.09-.03.16-.03.22m.77-2.9c0 .22.08.41.25.58q.24.24.57.24c.24 0 .43-.08.59-.23c.16-.16.23-.35.23-.59a.784.784 0 0 0-.82-.81c-.24 0-.43.08-.59.23s-.23.35-.23.58m.63-2.27c-.01.15.03.31.13.47q.15.24.45.3c.23.06.44.04.64-.06s.33-.29.41-.56l.27-.9c.07-.22.05-.43-.07-.63a.87.87 0 0 0-.53-.4a.77.77 0 0 0-.64.08c-.21.12-.34.3-.41.53l-.23.9c-.01.08-.02.17-.02.27m2.76 2.15q0 .24.15.48c.1.16.26.27.46.33c.03 0 .08.01.14.02s.1.02.14.02c.41 0 .66-.22.76-.66l.14-.6c.07-.21.05-.42-.07-.63a.8.8 0 0 0-.51-.41c-.25-.06-.48-.04-.68.08s-.34.29-.41.53l-.09.59c0 .02-.01.07-.02.12s-.01.09-.01.13m.74-2.96c0 .22.08.42.25.57q.225.24.57.24c.24 0 .43-.08.59-.23s.23-.35.23-.58c0-.24-.08-.43-.23-.59s-.35-.23-.59-.23s-.43.08-.59.23c-.15.16-.23.35-.23.59m.61-2.31c0 .17.05.33.16.48s.27.26.49.32c.02 0 .06.01.12.02s.11.02.14.02q.15 0 .36-.09c.21-.11.35-.29.41-.52l.24-.9c.06-.23.04-.44-.08-.63a.83.83 0 0 0-.51-.4a.8.8 0 0 0-.64.06c-.19.11-.33.27-.39.51l-.28.91c0 .02-.01.06-.02.12z"/></svg>',
    '大雨': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.65 16.96c0 1.32.47 2.46 1.4 3.41c.93.96 2.06 1.46 3.38 1.5c.12 0 .18-.06.18-.17v-1.33q0-.18-.18-.18c-.84-.04-1.57-.38-2.17-1.02s-.91-1.37-.91-2.22c0-.84.28-1.57.85-2.19s1.26-.97 2.1-1.04l.53-.07c.12 0 .19-.06.19-.18l.07-.5c.1-1.09.55-2.01 1.36-2.75s1.76-1.11 2.86-1.11c1.08 0 2.03.37 2.84 1.1s1.28 1.63 1.4 2.71l.07.58c0 .12.06.18.19.18h1.6c.9 0 1.67.32 2.32.97c.64.64.97 1.41.97 2.3q0 1.26-.9 2.22c-.6.63-1.33.97-2.18 1.02c-.13 0-.2.06-.2.18v1.33c0 .11.07.17.2.17c1.33-.04 2.46-.54 3.38-1.5s1.38-2.09 1.38-3.42c0-.89-.22-1.72-.67-2.48a4.9 4.9 0 0 0-1.81-1.8c-.76-.44-1.59-.66-2.48-.66h-.31A5.9 5.9 0 0 0 18 8.72a5.76 5.76 0 0 0-3.68-1.28c-1.41 0-2.66.44-3.75 1.31s-1.79 1.99-2.1 3.35c-1.13.29-2.04.88-2.75 1.77s-1.07 1.93-1.07 3.09m5.4 7.02c0 .17.05.34.16.51s.27.28.47.35c.23.07.44.06.64-.04c.19-.09.33-.28.39-.56l.14-.61a.853.853 0 0 0-.61-1.03c-.22-.07-.44-.04-.64.08s-.34.3-.4.53l-.14.59c0 .03-.01.09-.01.18m.76-2.9c0 .21.08.4.25.57c.16.17.34.25.56.25q.36 0 .6-.24c.16-.16.24-.35.24-.59c0-.23-.08-.43-.24-.59a.8.8 0 0 0-.6-.24c-.23 0-.42.08-.58.23c-.15.18-.23.38-.23.61m.61-2.27c-.01.16.03.31.14.45c.1.15.26.25.48.32c.21.06.41.04.62-.07s.34-.28.41-.51l.28-.9c.07-.24.05-.46-.07-.65a.9.9 0 0 0-.54-.39a.74.74 0 0 0-.63.07a.85.85 0 0 0-.41.5l-.24.92c0 .02-.01.06-.02.12c-.01.05-.02.1-.02.14m1.17 8.29c0 .18.05.34.15.5q.15.24.48.33c.08.02.17.03.25.03c.43 0 .69-.2.79-.61l.14-.59a.92.92 0 0 0-.08-.68a.77.77 0 0 0-.52-.37a.74.74 0 0 0-.63.07c-.21.12-.34.29-.41.51l-.14.59c-.02.09-.03.16-.03.22m.77-2.9c0 .22.08.41.25.58q.24.24.57.24c.24 0 .43-.08.59-.23c.16-.16.23-.35.23-.59a.784.784 0 0 0-.82-.81c-.24 0-.43.08-.59.23s-.23.35-.23.58m.63-2.27c-.01.15.03.31.13.47q.15.24.45.3c.23.06.44.04.64-.06s.33-.29.41-.56l.27-.9c.07-.22.05-.43-.07-.63a.87.87 0 0 0-.53-.4a.77.77 0 0 0-.64.08c-.21.12-.34.3-.41.53l-.23.9c-.01.08-.02.17-.02.27m2.76 2.15q0 .24.15.48c.1.16.26.27.46.33c.03 0 .08.01.14.02s.1.02.14.02c.41 0 .66-.22.76-.66l.14-.6c.07-.21.05-.42-.07-.63a.8.8 0 0 0-.51-.41c-.25-.06-.48-.04-.68.08s-.34.29-.41.53l-.09.59c0 .02-.01.07-.02.12s-.01.09-.01.13m.74-2.96c0 .22.08.42.25.57q.225.24.57.24c.24 0 .43-.08.59-.23s.23-.35.23-.58c0-.24-.08-.43-.23-.59s-.35-.23-.59-.23s-.43.08-.59.23c-.15.16-.23.35-.23.59m.61-2.31c0 .17.05.33.16.48s.27.26.49.32c.02 0 .06.01.12.02s.11.02.14.02q.15 0 .36-.09c.21-.11.35-.29.41-.52l.24-.9c.06-.23.04-.44-.08-.63a.83.83 0 0 0-.51-.4a.8.8 0 0 0-.64.06c-.19.11-.33.27-.39.51l-.28.91c0 .02-.01.06-.02.12z"/></svg>',
    '大到暴雨': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.65 16.96c0 1.32.47 2.46 1.4 3.41c.93.96 2.06 1.46 3.38 1.5c.12 0 .18-.06.18-.17v-1.33q0-.18-.18-.18c-.84-.04-1.57-.38-2.17-1.02s-.91-1.37-.91-2.22c0-.84.28-1.57.85-2.19s1.26-.97 2.1-1.04l.53-.07c.12 0 .19-.06.19-.18l.07-.5c.1-1.09.55-2.01 1.36-2.75s1.76-1.11 2.86-1.11c1.08 0 2.03.37 2.84 1.1s1.28 1.63 1.4 2.71l.07.58c0 .12.06.18.19.18h1.6c.9 0 1.67.32 2.32.97c.64.64.97 1.41.97 2.3q0 1.26-.9 2.22c-.6.63-1.33.97-2.18 1.02c-.13 0-.2.06-.2.18v1.33c0 .11.07.17.2.17c1.33-.04 2.46-.54 3.38-1.5s1.38-2.09 1.38-3.42c0-.89-.22-1.72-.67-2.48a4.9 4.9 0 0 0-1.81-1.8c-.76-.44-1.59-.66-2.48-.66h-.31A5.9 5.9 0 0 0 18 8.72a5.76 5.76 0 0 0-3.68-1.28c-1.41 0-2.66.44-3.75 1.31s-1.79 1.99-2.1 3.35c-1.13.29-2.04.88-2.75 1.77s-1.07 1.93-1.07 3.09m5.4 7.02c0 .17.05.34.16.51s.27.28.47.35c.23.07.44.06.64-.04c.19-.09.33-.28.39-.56l.14-.61a.853.853 0 0 0-.61-1.03c-.22-.07-.44-.04-.64.08s-.34.3-.4.53l-.14.59c0 .03-.01.09-.01.18m.76-2.9c0 .21.08.4.25.57c.16.17.34.25.56.25q.36 0 .6-.24c.16-.16.24-.35.24-.59c0-.23-.08-.43-.24-.59a.8.8 0 0 0-.6-.24c-.23 0-.42.08-.58.23c-.15.18-.23.38-.23.61m.61-2.27c-.01.16.03.31.14.45c.1.15.26.25.48.32c.21.06.41.04.62-.07s.34-.28.41-.51l.28-.9c.07-.24.05-.46-.07-.65a.9.9 0 0 0-.54-.39a.74.74 0 0 0-.63.07a.85.85 0 0 0-.41.5l-.24.92c0 .02-.01.06-.02.12c-.01.05-.02.1-.02.14m1.17 8.29c0 .18.05.34.15.5q.15.24.48.33c.08.02.17.03.25.03c.43 0 .69-.2.79-.61l.14-.59a.92.92 0 0 0-.08-.68a.77.77 0 0 0-.52-.37a.74.74 0 0 0-.63.07c-.21.12-.34.29-.41.51l-.14.59c-.02.09-.03.16-.03.22m.77-2.9c0 .22.08.41.25.58q.24.24.57.24c.24 0 .43-.08.59-.23c.16-.16.23-.35.23-.59a.784.784 0 0 0-.82-.81c-.24 0-.43.08-.59.23s-.23.35-.23.58m.63-2.27c-.01.15.03.31.13.47q.15.24.45.3c.23.06.44.04.64-.06s.33-.29.41-.56l.27-.9c.07-.22.05-.43-.07-.63a.87.87 0 0 0-.53-.4a.77.77 0 0 0-.64.08c-.21.12-.34.3-.41.53l-.23.9c-.01.08-.02.17-.02.27m2.76 2.15q0 .24.15.48c.1.16.26.27.46.33c.03 0 .08.01.14.02s.1.02.14.02c.41 0 .66-.22.76-.66l.14-.6c.07-.21.05-.42-.07-.63a.8.8 0 0 0-.51-.41c-.25-.06-.48-.04-.68.08s-.34.29-.41.53l-.09.59c0 .02-.01.07-.02.12s-.01.09-.01.13m.74-2.96c0 .22.08.42.25.57q.225.24.57.24c.24 0 .43-.08.59-.23s.23-.35.23-.58c0-.24-.08-.43-.23-.59s-.35-.23-.59-.23s-.43.08-.59.23c-.15.16-.23.35-.23.59m.61-2.31c0 .17.05.33.16.48s.27.26.49.32c.02 0 .06.01.12.02s.11.02.14.02q.15 0 .36-.09c.21-.11.35-.29.41-.52l.24-.9c.06-.23.04-.44-.08-.63a.83.83 0 0 0-.51-.4a.8.8 0 0 0-.64.06c-.19.11-.33.27-.39.51l-.28.91c0 .02-.01.06-.02.12z"/></svg>',
    '雪': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.64 16.95c0-1.16.35-2.18 1.06-3.08s1.62-1.48 2.74-1.76q.465-2.04 2.1-3.36c1.635-1.32 2.34-1.31 3.75-1.31c1.38 0 2.6.43 3.68 1.28s1.78 1.95 2.1 3.29h.32c.89 0 1.72.22 2.48.66s1.37 1.04 1.81 1.8s.67 1.59.67 2.48c0 1.32-.46 2.47-1.39 3.42c-.92.96-2.05 1.46-3.38 1.5c-.13 0-.2-.06-.2-.17v-1.33c0-.12.07-.18.2-.18c.85-.04 1.58-.38 2.18-1.02s.9-1.38.9-2.23c0-.89-.32-1.65-.97-2.3s-1.42-.97-2.32-.97h-1.61c-.12 0-.18-.06-.18-.17l-.08-.58c-.11-1.08-.58-1.99-1.39-2.72c-.82-.73-1.76-1.1-2.85-1.1c-1.1 0-2.05.37-2.86 1.11s-1.27 1.65-1.37 2.75l-.06.5c0 .12-.07.19-.2.19l-.53.07c-.83.07-1.53.41-2.1 1.04s-.85 1.35-.85 2.19c0 .85.3 1.59.9 2.23s1.33.97 2.18 1.02c.11 0 .17.06.17.18v1.33c0 .11-.06.17-.17.17c-1.34-.04-2.47-.54-3.4-1.5c-.87-.96-1.33-2.11-1.33-3.43M11 21.02c0-.22.08-.42.24-.58s.35-.24.59-.24c.23 0 .43.08.59.24s.24.36.24.58q0 .36-.24.6c-.16.17-.35.25-.59.25c-.23 0-.43-.08-.59-.25a.8.8 0 0 1-.24-.6m0 3.63q0-.36.24-.6c.16-.15.35-.23.58-.23s.43.08.59.23c.16.16.24.35.24.59s-.08.43-.24.59s-.35.23-.59.23a.84.84 0 0 1-.59-.23a.8.8 0 0 1-.23-.58m3.19-1.7c0-.23.08-.44.25-.62q.24-.24.57-.24c.23 0 .43.09.6.26s.26.37.26.6s-.08.43-.25.6s-.37.25-.61.25c-.23 0-.42-.08-.58-.25s-.24-.37-.24-.6m0-3.62c0-.23.08-.43.25-.6q.27-.24.57-.24c.24 0 .44.08.61.25a.8.8 0 0 1 .25.6c0 .23-.08.43-.25.59s-.37.24-.61.24c-.23 0-.42-.08-.58-.24a.85.85 0 0 1-.24-.6m0 7.28c0-.23.08-.43.25-.61q.24-.24.57-.24c.24 0 .44.08.61.25s.25.37.25.6s-.08.43-.25.59s-.37.24-.61.24a.824.824 0 0 1-.82-.83m3.22-5.59c0-.22.08-.41.25-.58s.37-.25.6-.25s.43.08.59.24s.24.36.24.58q0 .36-.24.6c-.16.17-.35.25-.59.25s-.44-.08-.6-.25a.82.82 0 0 1-.25-.59m0 3.63c0-.22.08-.42.25-.6c.16-.15.36-.23.6-.23s.43.08.59.23s.23.35.23.59s-.08.43-.23.59c-.16.16-.35.23-.59.23q-.36 0-.6-.24a.76.76 0 0 1-.25-.57"/></svg>',
    '小雪': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.64 16.95c0-1.16.35-2.18 1.06-3.08s1.62-1.48 2.74-1.76q.465-2.04 2.1-3.36c1.635-1.32 2.34-1.31 3.75-1.31c1.38 0 2.6.43 3.68 1.28s1.78 1.95 2.1 3.29h.32c.89 0 1.72.22 2.48.66s1.37 1.04 1.81 1.8s.67 1.59.67 2.48c0 1.32-.46 2.47-1.39 3.42c-.92.96-2.05 1.46-3.38 1.5c-.13 0-.2-.06-.2-.17v-1.33c0-.12.07-.18.2-.18c.85-.04 1.58-.38 2.18-1.02s.9-1.38.9-2.23c0-.89-.32-1.65-.97-2.3s-1.42-.97-2.32-.97h-1.61c-.12 0-.18-.06-.18-.17l-.08-.58c-.11-1.08-.58-1.99-1.39-2.72c-.82-.73-1.76-1.1-2.85-1.1c-1.1 0-2.05.37-2.86 1.11s-1.27 1.65-1.37 2.75l-.06.5c0 .12-.07.19-.2.19l-.53.07c-.83.07-1.53.41-2.1 1.04s-.85 1.35-.85 2.19c0 .85.3 1.59.9 2.23s1.33.97 2.18 1.02c.11 0 .17.06.17.18v1.33c0 .11-.06.17-.17.17c-1.34-.04-2.47-.54-3.4-1.5c-.87-.96-1.33-2.11-1.33-3.43M11 21.02c0-.22.08-.42.24-.58s.35-.24.59-.24c.23 0 .43.08.59.24s.24.36.24.58q0 .36-.24.6c-.16.17-.35.25-.59.25c-.23 0-.43-.08-.59-.25a.8.8 0 0 1-.24-.6m0 3.63q0-.36.24-.6c.16-.15.35-.23.58-.23s.43.08.59.23c.16.16.24.35.24.59s-.08.43-.24.59s-.35.23-.59.23a.84.84 0 0 1-.59-.23a.8.8 0 0 1-.23-.58m3.19-1.7c0-.23.08-.44.25-.62q.24-.24.57-.24c.23 0 .43.09.6.26s.26.37.26.6s-.08.43-.25.6s-.37.25-.61.25c-.23 0-.42-.08-.58-.25s-.24-.37-.24-.6m0-3.62c0-.23.08-.43.25-.6q.27-.24.57-.24c.24 0 .44.08.61.25a.8.8 0 0 1 .25.6c0 .23-.08.43-.25.59s-.37.24-.61.24c-.23 0-.42-.08-.58-.24a.85.85 0 0 1-.24-.6m0 7.28c0-.23.08-.43.25-.61q.24-.24.57-.24c.24 0 .44.08.61.25s.25.37.25.6s-.08.43-.25.59s-.37.24-.61.24a.824.824 0 0 1-.82-.83m3.22-5.59c0-.22.08-.41.25-.58s.37-.25.6-.25s.43.08.59.24s.24.36.24.58q0 .36-.24.6c-.16.17-.35.25-.59.25s-.44-.08-.6-.25a.82.82 0 0 1-.25-.59m0 3.63c0-.22.08-.42.25-.6c.16-.15.36-.23.6-.23s.43.08.59.23s.23.35.23.59s-.08.43-.23.59c-.16.16-.35.23-.59.23q-.36 0-.6-.24a.76.76 0 0 1-.25-.57"/></svg>',
    '中雪': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.64 16.95c0-1.16.35-2.18 1.06-3.08s1.62-1.48 2.74-1.76q.465-2.04 2.1-3.36c1.635-1.32 2.34-1.31 3.75-1.31c1.38 0 2.6.43 3.68 1.28s1.78 1.95 2.1 3.29h.32c.89 0 1.72.22 2.48.66s1.37 1.04 1.81 1.8s.67 1.59.67 2.48c0 1.32-.46 2.47-1.39 3.42c-.92.96-2.05 1.46-3.38 1.5c-.13 0-.2-.06-.2-.17v-1.33c0-.12.07-.18.2-.18c.85-.04 1.58-.38 2.18-1.02s.9-1.38.9-2.23c0-.89-.32-1.65-.97-2.3s-1.42-.97-2.32-.97h-1.61c-.12 0-.18-.06-.18-.17l-.08-.58c-.11-1.08-.58-1.99-1.39-2.72c-.82-.73-1.76-1.1-2.85-1.1c-1.1 0-2.05.37-2.86 1.11s-1.27 1.65-1.37 2.75l-.06.5c0 .12-.07.19-.2.19l-.53.07c-.83.07-1.53.41-2.1 1.04s-.85 1.35-.85 2.19c0 .85.3 1.59.9 2.23s1.33.97 2.18 1.02c.11 0 .17.06.17.18v1.33c0 .11-.06.17-.17.17c-1.34-.04-2.47-.54-3.4-1.5c-.87-.96-1.33-2.11-1.33-3.43M11 21.02c0-.22.08-.42.24-.58s.35-.24.59-.24c.23 0 .43.08.59.24s.24.36.24.58q0 .36-.24.6c-.16.17-.35.25-.59.25c-.23 0-.43-.08-.59-.25a.8.8 0 0 1-.24-.6m0 3.63q0-.36.24-.6c.16-.15.35-.23.58-.23s.43.08.59.23c.16.16.24.35.24.59s-.08.43-.24.59s-.35.23-.59.23a.84.84 0 0 1-.59-.23a.8.8 0 0 1-.23-.58m3.19-1.7c0-.23.08-.44.25-.62q.24-.24.57-.24c.23 0 .43.09.6.26s.26.37.26.6s-.08.43-.25.6s-.37.25-.61.25c-.23 0-.42-.08-.58-.25s-.24-.37-.24-.6m0-3.62c0-.23.08-.43.25-.6q.27-.24.57-.24c.24 0 .44.08.61.25a.8.8 0 0 1 .25.6c0 .23-.08.43-.25.59s-.37.24-.61.24c-.23 0-.42-.08-.58-.24a.85.85 0 0 1-.24-.6m0 7.28c0-.23.08-.43.25-.61q.24-.24.57-.24c.24 0 .44.08.61.25s.25.37.25.6s-.08.43-.25.59s-.37.24-.61.24a.824.824 0 0 1-.82-.83m3.22-5.59c0-.22.08-.41.25-.58s.37-.25.6-.25s.43.08.59.24s.24.36.24.58q0 .36-.24.6c-.16.17-.35.25-.59.25s-.44-.08-.6-.25a.82.82 0 0 1-.25-.59m0 3.63c0-.22.08-.42.25-.6c.16-.15.36-.23.6-.23s.43.08.59.23s.23.35.23.59s-.08.43-.23.59c-.16.16-.35.23-.59.23q-.36 0-.6-.24a.76.76 0 0 1-.25-.57"/></svg>',
    '大雪': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.64 16.95c0-1.16.35-2.18 1.06-3.08s1.62-1.48 2.74-1.76q.465-2.04 2.1-3.36c1.635-1.32 2.34-1.31 3.75-1.31c1.38 0 2.6.43 3.68 1.28s1.78 1.95 2.1 3.29h.32c.89 0 1.72.22 2.48.66s1.37 1.04 1.81 1.8s.67 1.59.67 2.48c0 1.32-.46 2.47-1.39 3.42c-.92.96-2.05 1.46-3.38 1.5c-.13 0-.2-.06-.2-.17v-1.33c0-.12.07-.18.2-.18c.85-.04 1.58-.38 2.18-1.02s.9-1.38.9-2.23c0-.89-.32-1.65-.97-2.3s-1.42-.97-2.32-.97h-1.61c-.12 0-.18-.06-.18-.17l-.08-.58c-.11-1.08-.58-1.99-1.39-2.72c-.82-.73-1.76-1.1-2.85-1.1c-1.1 0-2.05.37-2.86 1.11s-1.27 1.65-1.37 2.75l-.06.5c0 .12-.07.19-.2.19l-.53.07c-.83.07-1.53.41-2.1 1.04s-.85 1.35-.85 2.19c0 .85.3 1.59.9 2.23s1.33.97 2.18 1.02c.11 0 .17.06.17.18v1.33c0 .11-.06.17-.17.17c-1.34-.04-2.47-.54-3.4-1.5c-.87-.96-1.33-2.11-1.33-3.43M11 21.02c0-.22.08-.42.24-.58s.35-.24.59-.24c.23 0 .43.08.59.24s.24.36.24.58q0 .36-.24.6c-.16.17-.35.25-.59.25c-.23 0-.43-.08-.59-.25a.8.8 0 0 1-.24-.6m0 3.63q0-.36.24-.6c.16-.15.35-.23.58-.23s.43.08.59.23c.16.16.24.35.24.59s-.08.43-.24.59s-.35.23-.59.23a.84.84 0 0 1-.59-.23a.8.8 0 0 1-.23-.58m3.19-1.7c0-.23.08-.44.25-.62q.24-.24.57-.24c.23 0 .43.09.6.26s.26.37.26.6s-.08.43-.25.6s-.37.25-.61.25c-.23 0-.42-.08-.58-.25s-.24-.37-.24-.6m0-3.62c0-.23.08-.43.25-.6q.27-.24.57-.24c.24 0 .44.08.61.25a.8.8 0 0 1 .25.6c0 .23-.08.43-.25.59s-.37.24-.61.24c-.23 0-.42-.08-.58-.24a.85.85 0 0 1-.24-.6m0 7.28c0-.23.08-.43.25-.61q.24-.24.57-.24c.24 0 .44.08.61.25s.25.37.25.6s-.08.43-.25.59s-.37.24-.61.24a.824.824 0 0 1-.82-.83m3.22-5.59c0-.22.08-.41.25-.58s.37-.25.6-.25s.43.08.59.24s.24.36.24.58q0 .36-.24.6c-.16.17-.35.25-.59.25s-.44-.08-.6-.25a.82.82 0 0 1-.25-.59m0 3.63c0-.22.08-.42.25-.6c.16-.15.36-.23.6-.23s.43.08.59.23s.23.35.23.59s-.08.43-.23.59c-.16.16-.35.23-.59.23q-.36 0-.6-.24a.76.76 0 0 1-.25-.57"/></svg>',
    '大到暴雪': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.64 16.95c0-1.16.35-2.18 1.06-3.08s1.62-1.48 2.74-1.76q.465-2.04 2.1-3.36c1.635-1.32 2.34-1.31 3.75-1.31c1.38 0 2.6.43 3.68 1.28s1.78 1.95 2.1 3.29h.32c.89 0 1.72.22 2.48.66s1.37 1.04 1.81 1.8s.67 1.59.67 2.48c0 1.32-.46 2.47-1.39 3.42c-.92.96-2.05 1.46-3.38 1.5c-.13 0-.2-.06-.2-.17v-1.33c0-.12.07-.18.2-.18c.85-.04 1.58-.38 2.18-1.02s.9-1.38.9-2.23c0-.89-.32-1.65-.97-2.3s-1.42-.97-2.32-.97h-1.61c-.12 0-.18-.06-.18-.17l-.08-.58c-.11-1.08-.58-1.99-1.39-2.72c-.82-.73-1.76-1.1-2.85-1.1c-1.1 0-2.05.37-2.86 1.11s-1.27 1.65-1.37 2.75l-.06.5c0 .12-.07.19-.2.19l-.53.07c-.83.07-1.53.41-2.1 1.04s-.85 1.35-.85 2.19c0 .85.3 1.59.9 2.23s1.33.97 2.18 1.02c.11 0 .17.06.17.18v1.33c0 .11-.06.17-.17.17c-1.34-.04-2.47-.54-3.4-1.5c-.87-.96-1.33-2.11-1.33-3.43M11 21.02c0-.22.08-.42.24-.58s.35-.24.59-.24c.23 0 .43.08.59.24s.24.36.24.58q0 .36-.24.6c-.16.17-.35.25-.59.25c-.23 0-.43-.08-.59-.25a.8.8 0 0 1-.24-.6m0 3.63q0-.36.24-.6c.16-.15.35-.23.58-.23s.43.08.59.23c.16.16.24.35.24.59s-.08.43-.24.59s-.35.23-.59.23a.84.84 0 0 1-.59-.23a.8.8 0 0 1-.23-.58m3.19-1.7c0-.23.08-.44.25-.62q.24-.24.57-.24c.23 0 .43.09.6.26s.26.37.26.6s-.08.43-.25.6s-.37.25-.61.25c-.23 0-.42-.08-.58-.25s-.24-.37-.24-.6m0-3.62c0-.23.08-.43.25-.6q.27-.24.57-.24c.24 0 .44.08.61.25a.8.8 0 0 1 .25.6c0 .23-.08.43-.25.59s-.37.24-.61.24c-.23 0-.42-.08-.58-.24a.85.85 0 0 1-.24-.6m0 7.28c0-.23.08-.43.25-.61q.24-.24.57-.24c.24 0 .44.08.61.25s.25.37.25.6s-.08.43-.25.59s-.37.24-.61.24a.824.824 0 0 1-.82-.83m3.22-5.59c0-.22.08-.41.25-.58s.37-.25.6-.25s.43.08.59.24s.24.36.24.58q0 .36-.24.6c-.16.17-.35.25-.59.25s-.44-.08-.6-.25a.82.82 0 0 1-.25-.59m0 3.63c0-.22.08-.42.25-.6c.16-.15.36-.23.6-.23s.43.08.59.23s.23.35.23.59s-.08.43-.23.59c-.16.16-.35.23-.59.23q-.36 0-.6-.24a.76.76 0 0 1-.25-.57"/></svg>',
    '雷阵雨': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.63 16.91q0 1.665.99 2.97c.99 1.305 1.52 1.47 2.58 1.79l-.66 1.68c-.03.14.02.22.14.22h2.13l-.98 4.3h.28l3.92-5.75c.04-.04.04-.09.01-.14s-.08-.07-.15-.07h-2.18l2.48-4.64c.07-.14.02-.22-.14-.22h-2.94c-.09 0-.17.05-.23.15l-1.07 2.87c-.71-.18-1.3-.57-1.77-1.16s-.7-1.26-.7-2.01c0-.83.28-1.55.85-2.17c.57-.61 1.27-.97 2.1-1.07l.53-.07c.13 0 .2-.06.2-.18l.07-.51c.11-1.08.56-1.99 1.37-2.72s1.76-1.1 2.85-1.1s2.04.37 2.85 1.1c.82.73 1.28 1.64 1.4 2.72l.07.58c0 .11.06.17.18.17h1.6c.91 0 1.68.32 2.32.95s.97 1.4.97 2.28c0 .85-.3 1.59-.89 2.21s-1.33.97-2.2 1.04c-.13 0-.2.06-.2.18v1.37c0 .11.07.17.2.17c1.33-.04 2.46-.55 3.39-1.51s1.39-2.11 1.39-3.45c0-.9-.22-1.73-.67-2.49a4.9 4.9 0 0 0-1.81-1.8c-.77-.44-1.6-.66-2.5-.66h-.31c-.33-1.33-1.04-2.42-2.11-3.26s-2.3-1.27-3.68-1.27c-1.41 0-2.67.44-3.76 1.31s-1.79 1.99-2.1 3.36c-1.11.26-2.02.83-2.74 1.73s-1.08 1.95-1.08 3.1m8.14 9.71c0 .39.19.65.58.77c.01 0 .05 0 .11.01s.11.01.14.01c.17 0 .33-.05.49-.15s.27-.26.32-.48l2.25-8.69c.06-.24.04-.45-.07-.65a.83.83 0 0 0-.5-.39l-.26-.03c-.16 0-.32.05-.47.15a.74.74 0 0 0-.31.45l-2.26 8.72c-.01.1-.02.19-.02.28m4.16-3.06c0 .13.03.26.1.38c.14.22.31.37.51.44c.11.03.21.05.3.05s.2-.02.32-.08q.315-.135.42-.57l1.44-5.67c.03-.14.05-.23.05-.27c0-.15-.05-.3-.16-.45s-.26-.26-.46-.32l-.26-.03c-.17 0-.33.05-.47.15a.82.82 0 0 0-.3.45l-1.46 5.7c0 .02 0 .05-.01.11c-.02.05-.02.08-.02.11"/></svg>',
    '阵雨': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M1.52 16.9c0 1.11.33 2.09.98 2.96s1.51 1.46 2.57 1.78l-.64 1.7c-.04.14 0 .21.14.21H6.7L5.45 27.5h.29l4.17-5.39c.04-.04.04-.09.01-.14c-.02-.05-.07-.07-.14-.07H7.61l2.47-4.63c.07-.14.02-.22-.14-.22H7c-.09 0-.17.05-.23.14L5.7 20.07c-.71-.18-1.3-.57-1.77-1.16s-.7-1.26-.7-2.01c0-.83.28-1.55.85-2.17s1.27-.97 2.1-1.07l.52-.06c.13 0 .2-.06.2-.18l.06-.51c.11-1.08.57-1.99 1.38-2.72a4.15 4.15 0 0 1 2.86-1.1c1.09 0 2.04.37 2.85 1.1s1.28 1.64 1.4 2.72l.06.58c0 .11.06.17.18.17h1.61c.91 0 1.68.32 2.32.95s.96 1.39.96 2.29c0 .85-.3 1.59-.89 2.21s-1.32.97-2.19 1.04c-.13 0-.2.06-.2.18v1.37c0 .11.07.17.2.17c1.33-.04 2.46-.55 3.39-1.51s1.39-2.11 1.39-3.45c0-.74-.14-1.41-.43-2.01c.79-.96 1.18-2.06 1.18-3.32c0-.94-.24-1.81-.71-2.62a5.2 5.2 0 0 0-1.92-1.92c-.81-.47-1.68-.71-2.62-.71c-1.54 0-2.84.58-3.88 1.73c-.81-.43-1.71-.65-2.7-.65c-1.41 0-2.67.44-3.76 1.31s-1.79 1.99-2.1 3.36c-1.11.26-2.02.83-2.73 1.73s-1.09 1.94-1.09 3.09m8.09 9.58c-.01.15.03.3.14.44s.26.25.46.33q.105.03.21.03q.255 0 .51-.15c.255-.15.28-.26.34-.47l2.29-8.57a.83.83 0 0 0-.07-.64a.82.82 0 0 0-.49-.4a.78.78 0 0 0-.65.07c-.2.11-.34.28-.4.51l-2.31 8.6c-.02.07-.03.16-.03.25m.33-21.85c0 .24.08.43.25.59l.64.66c.17.17.37.25.61.26c.24 0 .43-.08.57-.26c.19-.15.28-.35.28-.6c0-.24-.08-.43-.25-.59l-.63-.66a.87.87 0 0 0-.61-.24c-.25 0-.46.08-.62.24q-.24.24-.24.6m3.83 18.8c0 .12.04.24.11.38c.13.2.29.34.5.43c.07.03.17.05.3.05q.225 0 .33-.06c.2-.08.34-.28.41-.58l1.49-5.55c.06-.24.04-.45-.07-.65a.85.85 0 0 0-.51-.39a.75.75 0 0 0-.64.07a.78.78 0 0 0-.39.51l-1.5 5.56c0 .02-.01.06-.02.11c-.01.06-.01.09-.01.12M15.3 9.04c.67-.64 1.49-.97 2.48-.97c.97 0 1.81.34 2.5 1.02s1.04 1.51 1.04 2.48c0 .62-.17 1.24-.52 1.85c-.99-.98-2.16-1.47-3.5-1.47h-.31c-.31-1.17-.88-2.14-1.69-2.91m1.61-5.25c0 .23.09.43.26.6s.37.26.6.26c.24 0 .43-.08.59-.25s.23-.37.23-.61V1.73c0-.24-.08-.44-.23-.61s-.35-.25-.59-.25c-.23 0-.43.08-.6.25s-.26.37-.26.61zm5.53 2.28c0 .24.09.44.26.6c.14.17.33.25.57.25s.44-.08.6-.25l1.44-1.45c.17-.16.26-.35.26-.59s-.08-.44-.25-.61a.82.82 0 0 0-.61-.25c-.22 0-.41.09-.57.26L22.7 5.47c-.17.16-.26.36-.26.6m.81 11.86q0 .33.24.6l.66.63c.12.14.31.23.54.24l.01.01h.1c.19 0 .36-.09.53-.26c.17-.16.26-.36.26-.6c0-.23-.09-.43-.26-.61l-.65-.61a.76.76 0 0 0-.58-.27c-.23 0-.43.08-.6.25c-.17.18-.25.39-.25.62m1.45-6.35q0 .345.27.6c.18.18.38.27.61.27h2.03c.23 0 .43-.09.6-.26s.26-.38.26-.61s-.08-.43-.25-.59a.85.85 0 0 0-.61-.24h-2.03q-.375 0-.63.24c-.17.16-.25.36-.25.59"/></svg>',
    '雾': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M2.62 21.05c0-.24.08-.45.25-.61q.255-.24.63-.24h18.67a.82.82 0 0 1 .85.85c0 .23-.08.43-.25.58c-.17.16-.37.23-.6.23H3.5c-.25 0-.46-.08-.63-.23a.76.76 0 0 1-.25-.58m2.62-3.14c0-.24.09-.44.26-.6c.15-.15.35-.23.59-.23h18.67c.23 0 .42.08.58.24s.23.35.23.59s-.08.44-.23.6c-.16.17-.35.25-.58.25H6.09c-.24 0-.44-.08-.6-.25a.82.82 0 0 1-.25-.6m.13-2.39c0 .09.05.13.15.13h1.43c.06 0 .13-.05.2-.16c.24-.52.59-.94 1.06-1.27s.99-.52 1.55-.56l.55-.07c.11 0 .17-.06.17-.18l.07-.5c.11-1.08.56-1.98 1.37-2.7q1.215-1.08 2.85-1.08c1.08 0 2.02.36 2.83 1.07c.8.71 1.26 1.61 1.37 2.68l.08.57c0 .11.07.17.2.17h1.59c.64 0 1.23.17 1.76.52s.92.8 1.18 1.37c.07.11.14.16.21.16h1.43c.12 0 .17-.07.14-.23c-.29-1.02-.88-1.86-1.74-2.51c-.87-.65-1.86-.97-2.97-.97h-.32q-.495-1.995-2.1-3.27c-1.605-1.275-2.28-1.27-3.65-1.27c-1.4 0-2.64.44-3.73 1.32s-1.78 2-2.09 3.36c-.85.2-1.6.6-2.24 1.21s-1.09 1.33-1.34 2.18v-.04c-.01 0-.01.03-.01.07m1.61 8.59c0-.24.09-.43.26-.59c.15-.15.35-.23.6-.23h18.68c.24 0 .44.08.6.23c.17.16.25.35.25.58c0 .24-.08.44-.25.61s-.37.25-.6.25H7.84c-.23 0-.43-.09-.6-.26a.77.77 0 0 1-.26-.59"/></svg>',
    '霾': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M7.33 16.58c0-.23.08-.41.23-.56c.16-.15.37-.22.64-.22h5.71c.27 0 .48.07.64.22s.23.33.23.56c0 .27-.08.49-.23.64s-.37.23-.64.23H8.2c-.27 0-.48-.08-.64-.23s-.23-.36-.23-.64m0-5.91c0-.22.08-.41.23-.55c.16-.15.37-.22.64-.22h2.96c.27 0 .48.07.64.22c.16.14.24.33.24.55c0 .27-.08.48-.24.64s-.37.24-.64.24H8.2c-.27 0-.48-.08-.64-.23s-.23-.38-.23-.65m.99 8.87c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28c.26 0 .46.09.62.27s.24.38.24.61c0 .27-.08.49-.23.65s-.36.23-.63.23a.87.87 0 0 1-.61-.24c-.19-.17-.27-.38-.27-.64m1.42-5.93c0-.23.07-.44.22-.61q.225-.27.54-.27c.26 0 .48.09.64.27s.24.38.24.61c0 .27-.08.49-.23.65c-.16.16-.37.23-.65.23c-.23 0-.41-.08-.55-.24s-.21-.37-.21-.64m.99 5.93a.87.87 0 0 1 .88-.88h3.83l.88.88c0 .26-.09.47-.27.64s-.38.24-.61.24h-3.83c-.27 0-.49-.08-.65-.24s-.23-.37-.23-.64m1.32-5.93c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28h3.83q.39 0 .63.27c.16.18.24.38.24.61c0 .27-.08.49-.23.65c-.16.16-.37.23-.64.23h-3.83a.87.87 0 0 1-.61-.24c-.18-.16-.27-.37-.27-.64m.76-2.94c0-.22.08-.41.24-.55s.37-.22.64-.22h5.71c.23 0 .43.08.61.23q.27.225.27.54c0 .26-.09.48-.27.64s-.38.24-.61.24h-5.71c-.27 0-.49-.08-.65-.24s-.23-.37-.23-.64m2.63 5.91c0-.21.09-.4.27-.55a.926.926 0 0 1 1.22 0a.7.7 0 0 1 .27.55q0 .39-.27.63c-.18.16-.38.24-.61.24a.87.87 0 0 1-.61-.24q-.27-.225-.27-.63m1.54 2.96c0-.23.08-.44.24-.61q.24-.27.63-.27h1.87c.26 0 .47.09.63.26s.24.38.24.62c0 .27-.08.49-.23.65s-.37.23-.64.23h-1.87c-.27 0-.48-.08-.64-.23c-.15-.16-.23-.38-.23-.65m.87-2.96c0-.21.09-.4.27-.55s.38-.23.61-.23h3.07c.22 0 .4.08.54.23s.22.33.22.55c0 .27-.07.48-.21.64s-.32.23-.55.23h-3.07a.87.87 0 0 1-.61-.24q-.27-.225-.27-.63m.44-2.97c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28h1.96q.315 0 .54.27c.15.18.23.38.23.61c0 .27-.07.48-.22.64c-.14.16-.33.24-.55.24h-1.96a.87.87 0 0 1-.61-.24c-.18-.16-.27-.37-.27-.64m2.74-2.94c0-.22.07-.4.22-.55s.33-.22.55-.22c.27 0 .48.07.64.22c.16.14.24.33.24.55c0 .27-.08.48-.24.64s-.37.24-.64.24c-.23 0-.41-.08-.55-.24c-.15-.16-.22-.37-.22-.64"/></svg>',
    '沙尘暴': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M7.33 16.58c0-.23.08-.41.23-.56c.16-.15.37-.22.64-.22h5.71c.27 0 .48.07.64.22s.23.33.23.56c0 .27-.08.49-.23.64s-.37.23-.64.23H8.2c-.27 0-.48-.08-.64-.23s-.23-.36-.23-.64m0-5.91c0-.22.08-.41.23-.55c.16-.15.37-.22.64-.22h2.96c.27 0 .48.07.64.22c.16.14.24.33.24.55c0 .27-.08.48-.24.64s-.37.24-.64.24H8.2c-.27 0-.48-.08-.64-.23s-.23-.38-.23-.65m.99 8.87c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28c.26 0 .46.09.62.27s.24.38.24.61c0 .27-.08.49-.23.65s-.36.23-.63.23a.87.87 0 0 1-.61-.24c-.19-.17-.27-.38-.27-.64m1.42-5.93c0-.23.07-.44.22-.61q.225-.27.54-.27c.26 0 .48.09.64.27s.24.38.24.61c0 .27-.08.49-.23.65c-.16.16-.37.23-.65.23c-.23 0-.41-.08-.55-.24s-.21-.37-.21-.64m.99 5.93a.87.87 0 0 1 .88-.88h3.83l.88.88c0 .26-.09.47-.27.64s-.38.24-.61.24h-3.83c-.27 0-.49-.08-.65-.24s-.23-.37-.23-.64m1.32-5.93c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28h3.83q.39 0 .63.27c.16.18.24.38.24.61c0 .27-.08.49-.23.65c-.16.16-.37.23-.64.23h-3.83a.87.87 0 0 1-.61-.24c-.18-.16-.27-.37-.27-.64m.76-2.94c0-.22.08-.41.24-.55s.37-.22.64-.22h5.71c.23 0 .43.08.61.23q.27.225.27.54c0 .26-.09.48-.27.64s-.38.24-.61.24h-5.71c-.27 0-.49-.08-.65-.24s-.23-.37-.23-.64m2.63 5.91c0-.21.09-.4.27-.55a.926.926 0 0 1 1.22 0a.7.7 0 0 1 .27.55q0 .39-.27.63c-.18.16-.38.24-.61.24a.87.87 0 0 1-.61-.24q-.27-.225-.27-.63m1.54 2.96c0-.23.08-.44.24-.61q.24-.27.63-.27h1.87c.26 0 .47.09.63.26s.24.38.24.62c0 .27-.08.49-.23.65s-.37.23-.64.23h-1.87c-.27 0-.48-.08-.64-.23c-.15-.16-.23-.38-.23-.65m.87-2.96c0-.21.09-.4.27-.55s.38-.23.61-.23h3.07c.22 0 .4.08.54.23s.22.33.22.55c0 .27-.07.48-.21.64s-.32.23-.55.23h-3.07a.87.87 0 0 1-.61-.24q-.27-.225-.27-.63m.44-2.97c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28h1.96q.315 0 .54.27c.15.18.23.38.23.61c0 .27-.07.48-.22.64c-.14.16-.33.24-.55.24h-1.96a.87.87 0 0 1-.61-.24c-.18-.16-.27-.37-.27-.64m2.74-2.94c0-.22.07-.4.22-.55s.33-.22.55-.22c.27 0 .48.07.64.22c.16.14.24.33.24.55c0 .27-.08.48-.24.64s-.37.24-.64.24c-.23 0-.41-.08-.55-.24c-.15-.16-.22-.37-.22-.64"/></svg>',
    '浮尘': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M7.33 16.58c0-.23.08-.41.23-.56c.16-.15.37-.22.64-.22h5.71c.27 0 .48.07.64.22s.23.33.23.56c0 .27-.08.49-.23.64s-.37.23-.64.23H8.2c-.27 0-.48-.08-.64-.23s-.23-.36-.23-.64m0-5.91c0-.22.08-.41.23-.55c.16-.15.37-.22.64-.22h2.96c.27 0 .48.07.64.22c.16.14.24.33.24.55c0 .27-.08.48-.24.64s-.37.24-.64.24H8.2c-.27 0-.48-.08-.64-.23s-.23-.38-.23-.65m.99 8.87c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28c.26 0 .46.09.62.27s.24.38.24.61c0 .27-.08.49-.23.65s-.36.23-.63.23a.87.87 0 0 1-.61-.24c-.19-.17-.27-.38-.27-.64m1.42-5.93c0-.23.07-.44.22-.61q.225-.27.54-.27c.26 0 .48.09.64.27s.24.38.24.61c0 .27-.08.49-.23.65c-.16.16-.37.23-.65.23c-.23 0-.41-.08-.55-.24s-.21-.37-.21-.64m.99 5.93a.87.87 0 0 1 .88-.88h3.83l.88.88c0 .26-.09.47-.27.64s-.38.24-.61.24h-3.83c-.27 0-.49-.08-.65-.24s-.23-.37-.23-.64m1.32-5.93c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28h3.83q.39 0 .63.27c.16.18.24.38.24.61c0 .27-.08.49-.23.65c-.16.16-.37.23-.64.23h-3.83a.87.87 0 0 1-.61-.24c-.18-.16-.27-.37-.27-.64m.76-2.94c0-.22.08-.41.24-.55s.37-.22.64-.22h5.71c.23 0 .43.08.61.23q.27.225.27.54c0 .26-.09.48-.27.64s-.38.24-.61.24h-5.71c-.27 0-.49-.08-.65-.24s-.23-.37-.23-.64m2.63 5.91c0-.21.09-.4.27-.55a.926.926 0 0 1 1.22 0a.7.7 0 0 1 .27.55q0 .39-.27.63c-.18.16-.38.24-.61.24a.87.87 0 0 1-.61-.24q-.27-.225-.27-.63m1.54 2.96c0-.23.08-.44.24-.61q.24-.27.63-.27h1.87c.26 0 .47.09.63.26s.24.38.24.62c0 .27-.08.49-.23.65s-.37.23-.64.23h-1.87c-.27 0-.48-.08-.64-.23c-.15-.16-.23-.38-.23-.65m.87-2.96c0-.21.09-.4.27-.55s.38-.23.61-.23h3.07c.22 0 .4.08.54.23s.22.33.22.55c0 .27-.07.48-.21.64s-.32.23-.55.23h-3.07a.87.87 0 0 1-.61-.24q-.27-.225-.27-.63m.44-2.97c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28h1.96q.315 0 .54.27c.15.18.23.38.23.61c0 .27-.07.48-.22.64c-.14.16-.33.24-.55.24h-1.96a.87.87 0 0 1-.61-.24c-.18-.16-.27-.37-.27-.64m2.74-2.94c0-.22.07-.4.22-.55s.33-.22.55-.22c.27 0 .48.07.64.22c.16.14.24.33.24.55c0 .27-.08.48-.24.64s-.37.24-.64.24c-.23 0-.41-.08-.55-.24c-.15-.16-.22-.37-.22-.64"/></svg>',
    '扬沙': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M7.33 16.58c0-.23.08-.41.23-.56c.16-.15.37-.22.64-.22h5.71c.27 0 .48.07.64.22s.23.33.23.56c0 .27-.08.49-.23.64s-.37.23-.64.23H8.2c-.27 0-.48-.08-.64-.23s-.23-.36-.23-.64m0-5.91c0-.22.08-.41.23-.55c.16-.15.37-.22.64-.22h2.96c.27 0 .48.07.64.22c.16.14.24.33.24.55c0 .27-.08.48-.24.64s-.37.24-.64.24H8.2c-.27 0-.48-.08-.64-.23s-.23-.38-.23-.65m.99 8.87c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28c.26 0 .46.09.62.27s.24.38.24.61c0 .27-.08.49-.23.65s-.36.23-.63.23a.87.87 0 0 1-.61-.24c-.19-.17-.27-.38-.27-.64m1.42-5.93c0-.23.07-.44.22-.61q.225-.27.54-.27c.26 0 .48.09.64.27s.24.38.24.61c0 .27-.08.49-.23.65c-.16.16-.37.23-.65.23c-.23 0-.41-.08-.55-.24s-.21-.37-.21-.64m.99 5.93a.87.87 0 0 1 .88-.88h3.83l.88.88c0 .26-.09.47-.27.64s-.38.24-.61.24h-3.83c-.27 0-.49-.08-.65-.24s-.23-.37-.23-.64m1.32-5.93c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28h3.83q.39 0 .63.27c.16.18.24.38.24.61c0 .27-.08.49-.23.65c-.16.16-.37.23-.64.23h-3.83a.87.87 0 0 1-.61-.24c-.18-.16-.27-.37-.27-.64m.76-2.94c0-.22.08-.41.24-.55s.37-.22.64-.22h5.71c.23 0 .43.08.61.23q.27.225.27.54c0 .26-.09.48-.27.64s-.38.24-.61.24h-5.71c-.27 0-.49-.08-.65-.24s-.23-.37-.23-.64m2.63 5.91c0-.21.09-.4.27-.55a.926.926 0 0 1 1.22 0a.7.7 0 0 1 .27.55q0 .39-.27.63c-.18.16-.38.24-.61.24a.87.87 0 0 1-.61-.24q-.27-.225-.27-.63m1.54 2.96c0-.23.08-.44.24-.61q.24-.27.63-.27h1.87c.26 0 .47.09.63.26s.24.38.24.62c0 .27-.08.49-.23.65s-.37.23-.64.23h-1.87c-.27 0-.48-.08-.64-.23c-.15-.16-.23-.38-.23-.65m.87-2.96c0-.21.09-.4.27-.55s.38-.23.61-.23h3.07c.22 0 .4.08.54.23s.22.33.22.55c0 .27-.07.48-.21.64s-.32.23-.55.23h-3.07a.87.87 0 0 1-.61-.24q-.27-.225-.27-.63m.44-2.97c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28h1.96q.315 0 .54.27c.15.18.23.38.23.61c0 .27-.07.48-.22.64c-.14.16-.33.24-.55.24h-1.96a.87.87 0 0 1-.61-.24c-.18-.16-.27-.37-.27-.64m2.74-2.94c0-.22.07-.4.22-.55s.33-.22.55-.22c.27 0 .48.07.64.22c.16.14.24.33.24.55c0 .27-.08.48-.24.64s-.37.24-.64.24c-.23 0-.41-.08-.55-.24c-.15-.16-.22-.37-.22-.64"/></svg>',
    '强沙尘暴': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M7.33 16.58c0-.23.08-.41.23-.56c.16-.15.37-.22.64-.22h5.71c.27 0 .48.07.64.22s.23.33.23.56c0 .27-.08.49-.23.64s-.37.23-.64.23H8.2c-.27 0-.48-.08-.64-.23s-.23-.36-.23-.64m0-5.91c0-.22.08-.41.23-.55c.16-.15.37-.22.64-.22h2.96c.27 0 .48.07.64.22c.16.14.24.33.24.55c0 .27-.08.48-.24.64s-.37.24-.64.24H8.2c-.27 0-.48-.08-.64-.23s-.23-.38-.23-.65m.99 8.87c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28c.26 0 .46.09.62.27s.24.38.24.61c0 .27-.08.49-.23.65s-.36.23-.63.23a.87.87 0 0 1-.61-.24c-.19-.17-.27-.38-.27-.64m1.42-5.93c0-.23.07-.44.22-.61q.225-.27.54-.27c.26 0 .48.09.64.27s.24.38.24.61c0 .27-.08.49-.23.65c-.16.16-.37.23-.65.23c-.23 0-.41-.08-.55-.24s-.21-.37-.21-.64m.99 5.93a.87.87 0 0 1 .88-.88h3.83l.88.88c0 .26-.09.47-.27.64s-.38.24-.61.24h-3.83c-.27 0-.49-.08-.65-.24s-.23-.37-.23-.64m1.32-5.93c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28h3.83q.39 0 .63.27c.16.18.24.38.24.61c0 .27-.08.49-.23.65c-.16.16-.37.23-.64.23h-3.83a.87.87 0 0 1-.61-.24c-.18-.16-.27-.37-.27-.64m.76-2.94c0-.22.08-.41.24-.55s.37-.22.64-.22h5.71c.23 0 .43.08.61.23q.27.225.27.54c0 .26-.09.48-.27.64s-.38.24-.61.24h-5.71c-.27 0-.49-.08-.65-.24s-.23-.37-.23-.64m2.63 5.91c0-.21.09-.4.27-.55a.926.926 0 0 1 1.22 0a.7.7 0 0 1 .27.55q0 .39-.27.63c-.18.16-.38.24-.61.24a.87.87 0 0 1-.61-.24q-.27-.225-.27-.63m1.54 2.96c0-.23.08-.44.24-.61q.24-.27.63-.27h1.87c.26 0 .47.09.63.26s.24.38.24.62c0 .27-.08.49-.23.65s-.37.23-.64.23h-1.87c-.27 0-.48-.08-.64-.23c-.15-.16-.23-.38-.23-.65m.87-2.96c0-.21.09-.4.27-.55s.38-.23.61-.23h3.07c.22 0 .4.08.54.23s.22.33.22.55c0 .27-.07.48-.21.64s-.32.23-.55.23h-3.07a.87.87 0 0 1-.61-.24q-.27-.225-.27-.63m.44-2.97c0-.22.09-.42.28-.6c.18-.18.39-.28.6-.28h1.96q.315 0 .54.27c.15.18.23.38.23.61c0 .27-.07.48-.22.64c-.14.16-.33.24-.55.24h-1.96a.87.87 0 0 1-.61-.24c-.18-.16-.27-.37-.27-.64m2.74-2.94c0-.22.07-.4.22-.55s.33-.22.55-.22c.27 0 .48.07.64.22c.16.14.24.33.24.55c0 .27-.08.48-.24.64s-.37.24-.64.24c-.23 0-.41-.08-.55-.24c-.15-.16-.22-.37-.22-.64"/></svg>',
    '冰雹': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.64 16.9c0 1.33.46 2.47 1.39 3.43s2.06 1.47 3.4 1.53c.11 0 .17-.06.17-.17v-1.34c0-.11-.06-.17-.17-.17c-.86-.04-1.58-.38-2.18-1.02s-.9-1.39-.9-2.26c0-.83.28-1.54.84-2.16c.56-.61 1.26-.97 2.09-1.07l.53-.03c.13 0 .2-.06.2-.19l.06-.53c.11-1.08.56-1.99 1.37-2.71c.81-.73 1.76-1.09 2.85-1.09s2.04.36 2.85 1.09s1.27 1.63 1.39 2.71l.08.58c0 .11.06.17.18.17h1.61q1.335 0 2.31.96c.65.64.98 1.39.98 2.27c0 .87-.3 1.62-.9 2.26s-1.33.98-2.18 1.02c-.13 0-.2.06-.2.17v1.34c0 .11.07.17.2.17c.87-.02 1.67-.26 2.4-.71s1.31-1.05 1.73-1.8s.63-1.57.63-2.44c0-.89-.22-1.72-.67-2.47c-.44-.75-1.05-1.35-1.81-1.78S21.29 12 20.4 12h-.32c-.32-1.34-1.03-2.43-2.1-3.28s-2.3-1.28-3.68-1.28c-1.41 0-2.66.44-3.75 1.31a5.83 5.83 0 0 0-2.1 3.35c-1.11.26-2.02.83-2.73 1.73s-1.08 1.92-1.08 3.07m5.45 7.2c.09.21.25.37.46.46c.2.1.41.11.62.02c.22-.09.36-.24.45-.45c.1-.22.11-.43.02-.64c-.08-.21-.24-.35-.45-.44c-.2-.11-.4-.12-.61-.03a.85.85 0 0 0-.46.47c-.11.17-.11.37-.03.61m.63-2.82q0 .24.15.45c.1.15.26.25.46.32c.19.11.4.12.62.01c.22-.1.37-.3.44-.6l.9-3.38c.06-.25.04-.47-.08-.67a.72.72 0 0 0-.53-.36a.84.84 0 0 0-.71.12c-.15.1-.26.25-.32.44L10.77 21c-.04.16-.05.25-.05.28m1.86 5.59c0 .12.02.22.06.29q.135.33.45.45c.09.05.2.08.33.08q.09 0 .3-.06c.22-.08.38-.23.47-.45q.15-.33 0-.66a.88.88 0 0 0-.45-.46c-.2-.09-.4-.09-.62 0a.8.8 0 0 0-.41.36c-.09.16-.13.31-.13.45m.73-2.61c0 .37.21.61.63.73a.86.86 0 0 0 .62-.04q.315-.12.42-.57l1.67-6.29c.06-.24.04-.45-.06-.65a.76.76 0 0 0-.49-.38q-.12-.03-.27-.03a.9.9 0 0 0-.48.15c-.16.1-.26.25-.3.44l-1.71 6.34q-.03.21-.03.3m3.43-.46c0 .12.02.23.08.32c.08.19.23.34.44.44c.11.04.23.07.35.07q.09 0 .3-.06c.21-.08.37-.23.46-.44c.07-.22.07-.43-.01-.63a.84.84 0 0 0-.42-.45c-.23-.11-.44-.12-.65-.03a.85.85 0 0 0-.46.47c-.06.1-.09.2-.09.31m.73-2.57c0 .14.05.29.16.45q.165.24.45.33c.16.03.25.05.27.05c.09 0 .22-.03.37-.1c.2-.09.33-.27.4-.52l.9-3.34l.03-.26c0-.16-.05-.31-.15-.46a.78.78 0 0 0-.45-.31c-.09-.02-.18-.03-.26-.03c-.16 0-.32.05-.47.15s-.25.25-.31.45l-.9 3.36z"/></svg>',
    '暴雨': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 30 30"><!-- Icon from Weather Icons by Erik Flowers - https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL --><path fill="currentColor" d="M4.65 16.96c0 1.32.47 2.46 1.4 3.41c.93.96 2.06 1.46 3.38 1.5c.12 0 .18-.06.18-.17v-1.33q0-.18-.18-.18c-.84-.04-1.57-.38-2.17-1.02s-.91-1.37-.91-2.22c0-.84.28-1.57.85-2.19s1.26-.97 2.1-1.04l.53-.07c.12 0 .19-.06.19-.18l.07-.5c.1-1.09.55-2.01 1.36-2.75s1.76-1.11 2.86-1.11c1.08 0 2.03.37 2.84 1.1s1.28 1.63 1.4 2.71l.07.58c0 .12.06.18.19.18h1.6c.9 0 1.67.32 2.32.97c.64.64.97 1.41.97 2.3q0 1.26-.9 2.22c-.6.63-1.33.97-2.18 1.02c-.13 0-.2.06-.2.18v1.33c0 .11.07.17.2.17c1.33-.04 2.46-.54 3.38-1.5s1.38-2.09 1.38-3.42c0-.89-.22-1.72-.67-2.48a4.9 4.9 0 0 0-1.81-1.8c-.76-.44-1.59-.66-2.48-.66h-.31A5.9 5.9 0 0 0 18 8.72a5.76 5.76 0 0 0-3.68-1.28c-1.41 0-2.66.44-3.75 1.31s-1.79 1.99-2.1 3.35c-1.13.29-2.04.88-2.75 1.77s-1.07 1.93-1.07 3.09m5.4 7.02c0 .17.05.34.16.51s.27.28.47.35c.23.07.44.06.64-.04c.19-.09.33-.28.39-.56l.14-.61a.853.853 0 0 0-.61-1.03c-.22-.07-.44-.04-.64.08s-.34.3-.4.53l-.14.59c0 .03-.01.09-.01.18m.76-2.9c0 .21.08.4.25.57c.16.17.34.25.56.25q.36 0 .6-.24c.16-.16.24-.35.24-.59c0-.23-.08-.43-.24-.59a.8.8 0 0 0-.6-.24c-.23 0-.42.08-.58.23c-.15.18-.23.38-.23.61m.61-2.27c-.01.16.03.31.14.45c.1.15.26.25.48.32c.21.06.41.04.62-.07s.34-.28.41-.51l.28-.9c.07-.24.05-.46-.07-.65a.9.9 0 0 0-.54-.39a.74.74 0 0 0-.63.07a.85.85 0 0 0-.41.5l-.24.92c0 .02-.01.06-.02.12c-.01.05-.02.1-.02.14m1.17 8.29c0 .18.05.34.15.5q.15.24.48.33c.08.02.17.03.25.03c.43 0 .69-.2.79-.61l.14-.59a.92.92 0 0 0-.08-.68a.77.77 0 0 0-.52-.37a.74.74 0 0 0-.63.07c-.21.12-.34.29-.41.51l-.14.59c-.02.09-.03.16-.03.22m.77-2.9c0 .22.08.41.25.58q.24.24.57.24c.24 0 .43-.08.59-.23c.16-.16.23-.35.23-.59a.784.784 0 0 0-.82-.81c-.24 0-.43.08-.59.23s-.23.35-.23.58m.63-2.27c-.01.15.03.31.13.47q.15.24.45.3c.23.06.44.04.64-.06s.33-.29.41-.56l.27-.9c.07-.22.05-.43-.07-.63a.87.87 0 0 0-.53-.4a.77.77 0 0 0-.64.08c-.21.12-.34.3-.41.53l-.23.9c-.01.08-.02.17-.02.27m2.76 2.15q0 .24.15.48c.1.16.26.27.46.33c.03 0 .08.01.14.02s.1.02.14.02c.41 0 .66-.22.76-.66l.14-.6c.07-.21.05-.42-.07-.63a.8.8 0 0 0-.51-.41c-.25-.06-.48-.04-.68.08s-.34.29-.41.53l-.09.59c0 .02-.01.07-.02.12s-.01.09-.01.13m.74-2.96c0 .22.08.42.25.57q.225.24.57.24c.24 0 .43-.08.59-.23s.23-.35.23-.58c0-.24-.08-.43-.23-.59s-.35-.23-.59-.23s-.43.08-.59.23c-.15.16-.23.35-.23.59m.61-2.31c0 .17.05.33.16.48s.27.26.49.32c.02 0 .06.01.12.02s.11.02.14.02q.15 0 .36-.09c.21-.11.35-.29.41-.52l.24-.9c.06-.23.04-.44-.08-.63a.83.83 0 0 0-.51-.4a.8.8 0 0 0-.64.06c-.19.11-.33.27-.39.51l-.28.91c0 .02-.01.06-.02.12z"/></svg>',
}
export const weatherBg: Record<string, string> = {
    '晴': 'sunny',
    '晴转多云': 'cloudy',
    '多云': 'cloudy',
    '阴': 'cloud',
    '雨': 'rain',
    '小雨': 'rain',
    '小到中雨': 'rain',
    '中雨': 'rain',
    '中到大雨': 'rain',
    '大雨': 'rain',
    '大到暴雨': 'rain',
    '雪': 'snow',
    '小雪': 'snow',
    '中雪': 'snow',
    '大雪': 'snow',
    '大到暴雪': 'snow',
    '雷阵雨': 'hunder',
    '雾': 'foggy',
    '沙尘暴': 'haze',
    '浮尘': 'haze',
    '扬沙': 'haze',
    '强沙尘暴': 'haze',
    '霾': 'haze',
    '冰雹': 'other',
    '暴雨': 'rain',
}

export const getWeatherBg = (weather: string) => {
    const hours = new Date().getHours()
    const d = hours >= 18 && hours < 6 ? 'n' : 'd'
    return `weather-${weatherBg[weather || 'cloudy']}_${d}`
}

export const lifeIcon: Record<string, string> = {
    '感冒': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Covid Icons by Streamline - https://creativecommons.org/licenses/by/4.0/ --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.966 20.602a2.714 2.714 0 1 0 0-5.428a2.714 2.714 0 0 0 0 5.428m-.452-7.464h.905m-.453 0v2.036m3.039-.965l.64.64m-.32-.32l-1.439 1.44m2.83 1.467v.904m0-.452h-2.035m.964 3.039l-.64.64m.32-.32l-1.439-1.44m-1.467 2.831h-.905m.452 0v-2.036m-3.038.965l-.64-.64m.32.32l1.439-1.44m-2.831-1.467v-.904m0 .452h2.036m-.964-3.039l.64-.64m-.32.32l1.439 1.44M11.411 6.75a3 3 0 1 0 0-6a3 3 0 0 0 0 6m4.555 4.138a5.251 5.251 0 0 0-9.8 2.612v2.25h2.25l.75 7.5h2.805M2.966 3.888L1.524 5.571a1 1 0 0 0 0 1.3L2.409 7.9a1 1 0 0 1 0 1.3l-.885 1.031a1 1 0 0 0 0 1.3l.885 1.032a1 1 0 0 1 0 1.3L1.524 14.9a1 1 0 0 0 0 1.3l1.442 1.682m16.558-8.676a1 1 0 0 1 0-1.3l.885-1.032a1 1 0 0 0 0-1.3l-1.443-1.686"/></svg>',
    '风寒': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Covid Icons by Streamline - https://creativecommons.org/licenses/by/4.0/ --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.966 20.602a2.714 2.714 0 1 0 0-5.428a2.714 2.714 0 0 0 0 5.428m-.452-7.464h.905m-.453 0v2.036m3.039-.965l.64.64m-.32-.32l-1.439 1.44m2.83 1.467v.904m0-.452h-2.035m.964 3.039l-.64.64m.32-.32l-1.439-1.44m-1.467 2.831h-.905m.452 0v-2.036m-3.038.965l-.64-.64m.32.32l1.439-1.44m-2.831-1.467v-.904m0 .452h2.036m-.964-3.039l.64-.64m-.32.32l1.439 1.44M11.411 6.75a3 3 0 1 0 0-6a3 3 0 0 0 0 6m4.555 4.138a5.251 5.251 0 0 0-9.8 2.612v2.25h2.25l.75 7.5h2.805M2.966 3.888L1.524 5.571a1 1 0 0 0 0 1.3L2.409 7.9a1 1 0 0 1 0 1.3l-.885 1.031a1 1 0 0 0 0 1.3l.885 1.032a1 1 0 0 1 0 1.3L1.524 14.9a1 1 0 0 0 0 1.3l1.442 1.682m16.558-8.676a1 1 0 0 1 0-1.3l.885-1.032a1 1 0 0 0 0-1.3l-1.443-1.686"/></svg>',
    '洗车': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M12 5q-.625 0-1.062-.437T10.5 3.5q0-.525.363-1.125T12 1q.775.775 1.138 1.375T13.5 3.5q0 .625-.437 1.063T12 5M7 5q-.625 0-1.062-.437T5.5 3.5q0-.525.363-1.125T7 1q.775.775 1.138 1.375T8.5 3.5q0 .625-.437 1.063T7 5m10 0q-.625 0-1.062-.437T15.5 3.5q0-.525.363-1.125T17 1q.775.775 1.138 1.375T18.5 3.5q0 .625-.437 1.063T17 5M6 21v1q0 .425-.288.713T5 23H4q-.425 0-.712-.288T3 22v-8l2.1-6q.15-.45.538-.725T6.5 7h11q.475 0 .863.275T18.9 8l2.1 6v8q0 .425-.287.713T20 23h-1q-.425 0-.712-.288T18 22v-1zm-.2-9h12.4l-1.05-3H6.85zM5 14v5zm2.5 4q.625 0 1.063-.437T9 16.5t-.437-1.062T7.5 15t-1.062.438T6 16.5t.438 1.063T7.5 18m9 0q.625 0 1.063-.437T18 16.5t-.437-1.062T16.5 15t-1.062.438T15 16.5t.438 1.063T16.5 18M5 19h14v-5H5z"/></svg>',
    '穿衣': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><!-- Icon from IconPark Outline by ByteDance - https://github.com/bytedance/IconPark/blob/master/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="M37 17v20m-26 0v7h26v-7m-26 0H4V17c0-3 2-6.5 5-9s9-4 9-4h12s6 1.5 9 4s5 6 5 9v20h-7m-26 0V17"/><path d="M30 4a6 6 0 0 1-12 0"/></g></svg>',
    '晨练': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="m8.75 16.7l-1 1.725q-.2.35-.612.463t-.763-.088t-.462-.612t.087-.763L10.65 9.4q-.95-.975-1.425-2.225T8.75 4.6q0-.65.113-1.312T9.25 2q.15-.375.55-.488t.75.088t.463.6T11 3q-.125.375-.187.763t-.063.787q0 1.325.65 2.488T13.25 8.9l2.25 1.3q1.55.9 2.275 2.588t.725 3.162q0 .675-.125 1.338T18 18.575q-.15.4-.55.513T16.675 19q-.35-.2-.475-.6t0-.825q.125-.4.188-.788T16.45 16q0-.8-.225-1.55t-.725-1.4l-5.8 9.975q-.2.35-.612.463t-.763-.088t-.462-.612t.087-.763l2.5-4.325zM16 9q-.825 0-1.412-.587T14 7t.588-1.412T16 5t1.413.588T18 7t-.587 1.413T16 9m-2.5-5q-.65 0-1.075-.45T12 2.5q0-.65.45-1.075T13.5 1q.65 0 1.075.45T15 2.5q0 .65-.45 1.075T13.5 4"/></svg>',
    '运动': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="m8.75 16.7l-1 1.725q-.2.35-.612.463t-.763-.088t-.462-.612t.087-.763L10.65 9.4q-.95-.975-1.425-2.225T8.75 4.6q0-.65.113-1.312T9.25 2q.15-.375.55-.488t.75.088t.463.6T11 3q-.125.375-.187.763t-.063.787q0 1.325.65 2.488T13.25 8.9l2.25 1.3q1.55.9 2.275 2.588t.725 3.162q0 .675-.125 1.338T18 18.575q-.15.4-.55.513T16.675 19q-.35-.2-.475-.6t0-.825q.125-.4.188-.788T16.45 16q0-.8-.225-1.55t-.725-1.4l-5.8 9.975q-.2.35-.612.463t-.763-.088t-.462-.612t.087-.763l2.5-4.325zM16 9q-.825 0-1.412-.587T14 7t.588-1.412T16 5t1.413.588T18 7t-.587 1.413T16 9m-2.5-5q-.65 0-1.075-.45T12 2.5q0-.65.45-1.075T13.5 1q.65 0 1.075.45T15 2.5q0 .65-.45 1.075T13.5 4"/></svg>',
    '旅游': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14"><!-- Icon from Streamline by Streamline - https://creativecommons.org/licenses/by/4.0/ --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="6.5"/><path d="M1 9.5h1.75A1.75 1.75 0 0 0 4.5 7.75v-1.5A1.75 1.75 0 0 1 6.25 4.5A1.75 1.75 0 0 0 8 2.75V.57m5.5 6.33a3.56 3.56 0 0 0-1.62-.4H9.75a1.75 1.75 0 0 0 0 3.5A1.25 1.25 0 0 1 11 11.25v.87"/></g></svg>',
    '紫外线': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M12 15q1.25 0 2.125-.875T15 12t-.875-2.125T12 9t-2.125.875T9 12t.875 2.125T12 15m0 2q-2.075 0-3.537-1.463T7 12t1.463-3.537T12 7t3.538 1.463T17 12t-1.463 3.538T12 17m-7-4H1v-2h4zm18 0h-4v-2h4zM11 5V1h2v4zm0 18v-4h2v4zM6.4 7.75L3.875 5.325L5.3 3.85l2.4 2.5zm12.3 12.4l-2.425-2.525L17.6 16.25l2.525 2.425zM16.25 6.4l2.425-2.525L20.15 5.3l-2.5 2.4zM3.85 18.7l2.525-2.425L7.75 17.6l-2.425 2.525zM12 12"/></svg>',
    '舒适度': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Sargam Icons by Abhimanyu Rana - https://github.com/planetabhi/sargam-icons/blob/main/LICENSE.txt --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="m16.583 14.083l-.079.213A4.808 4.808 0 0 1 9.26 16.56a4.8 4.8 0 0 1-1.764-2.265l-.08-.213M8 9v1m8-1v1m6 2c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10"/></svg>',
    '路况': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M11.938 17.616q.481 0 .8-.315t.32-.796t-.315-.801t-.796-.32t-.8.315t-.32.796t.315.801t.796.32m0-4.5q.481 0 .8-.315t.32-.796t-.315-.801t-.796-.32t-.8.315t-.32.796t.315.801t.796.32m0-4.5q.481 0 .8-.315t.32-.796t-.315-.801t-.796-.32t-.8.315t-.32.797t.315.8t.796.32M7.942 15.23v-2.342q-.967-.235-1.445-.872q-.478-.636-.478-1.401h1.923V8.273q-.967-.235-1.445-.871Q6.019 6.765 6.019 6h1.923v-.923q0-.518.294-.797T8.942 4h6q.413 0 .706.28t.294.797V6h2.039q0 .766-.536 1.402q-.535.637-1.503.871v2.343h2.039q0 .765-.536 1.401q-.535.637-1.503.872v2.342h2.039q0 .765-.536 1.402q-.535.636-1.503.87V19q0 .413-.293.706t-.707.294h-6q-.412 0-.706-.294T7.942 19v-1.496q-.967-.235-1.445-.871q-.478-.637-.478-1.402zm1 3.769h6V5h-6zm0 0V5z"/></svg>',
    '交通': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M11.938 17.616q.481 0 .8-.315t.32-.796t-.315-.801t-.796-.32t-.8.315t-.32.796t.315.801t.796.32m0-4.5q.481 0 .8-.315t.32-.796t-.315-.801t-.796-.32t-.8.315t-.32.796t.315.801t.796.32m0-4.5q.481 0 .8-.315t.32-.796t-.315-.801t-.796-.32t-.8.315t-.32.797t.315.8t.796.32M7.942 15.23v-2.342q-.967-.235-1.445-.872q-.478-.636-.478-1.401h1.923V8.273q-.967-.235-1.445-.871Q6.019 6.765 6.019 6h1.923v-.923q0-.518.294-.797T8.942 4h6q.413 0 .706.28t.294.797V6h2.039q0 .766-.536 1.402q-.535.637-1.503.871v2.343h2.039q0 .765-.536 1.401q-.535.637-1.503.872v2.342h2.039q0 .765-.536 1.402q-.535.636-1.503.87V19q0 .413-.293.706t-.707.294h-6q-.412 0-.706-.294T7.942 19v-1.496q-.967-.235-1.445-.871q-.478-.637-.478-1.402zm1 3.769h6V5h-6zm0 0V5z"/></svg>',
    '心情': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE --><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8S14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8S7 8.67 7 9.5S7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5"/></svg>',
    '太阳镜': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><!-- Icon from IonIcons by Ben Sperry - https://github.com/ionic-team/ionicons/blob/main/LICENSE --><path d="M480 176H272v.1h-32v-.1H32v48h11l5 21.5C64 313 88.5 336 144 336s96-17.4 96-90.5V224s1.5-16 16-16 16 16 16 16v21.8c0 73 42.1 90.2 97 90.2s79-25 95-90.2l5-21.8h11v-48z" fill="currentColor"/></svg>',
    '化妆': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><!-- Icon from IconPark Outline by ByteDance - https://github.com/bytedance/IconPark/blob/master/LICENSE --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M13 19a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v19s0 6-6 6h-8c-6 0-6-6-6-6zm5-7h10v5H18zm0 0V9c0-3 3-5 6-5h11s-7 2-7 6v2"/></svg>',
    '钓鱼': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><!-- Icon from Plump free icons by Streamline - https://creativecommons.org/licenses/by/4.0/ --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3"><path stroke-linejoin="round" d="M30 39c9 0 15-8.571 15-15S39 9 30 9c-7.996 0-14.66 5.233-18.217 9.676a10.8 10.8 0 0 0-.8-2.181c-1.089-2.24-3.586-3.787-5.38-4.655c-1.06-.514-2.232.153-2.38 1.321c-.29 2.276-.483 5.849.661 8.203c.572 1.177 1.209 2.044 1.875 2.636c-.666.592-1.303 1.459-1.875 2.636c-1.144 2.354-.951 5.927-.662 8.203c.149 1.168 1.322 1.835 2.381 1.322c1.794-.869 4.291-2.415 5.38-4.655c.372-.767.635-1.496.8-2.182C15.34 33.767 22.004 39 30 39"/><path d="M29.334 14.4c-3.385 4.76-3.385 14.441 0 19.2M21 20c-.667 1.983-.667 6.017 0 8m14-8v1"/></g></svg>',
    '雨伞': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Basil by Craftwork - https://creativecommons.org/licenses/by/4.0/ --><path fill="currentColor" fill-rule="evenodd" d="M12.75 2a.75.75 0 0 0-1.5 0v.278c-4.984.38-8.92 4.505-8.999 9.567a.92.92 0 0 0 .766.918c2.727.455 5.479.7 8.233.739V19a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 0-1.5 0v.5a2.25 2.25 0 0 0 4.5 0v-5.498a54.6 54.6 0 0 0 8.233-.739a.92.92 0 0 0 .766-.918a9.753 9.753 0 0 0-8.999-9.567zm7.476 9.366a8.25 8.25 0 0 0-16.452 0c5.45.854 11.001.854 16.452 0" clip-rule="evenodd"/></svg>',
    '防晒': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M11 5V1h2v4zm6.65 2.75l-1.375-1.375l2.8-2.875l1.4 1.425zM19 13v-2h4v2zm-8 10v-4h2v4zM6.35 7.7L3.5 4.925l1.425-1.4L7.75 6.35zm12.7 12.8l-2.775-2.875l1.35-1.35l2.85 2.75zM1 13v-2h4v2zm3.925 7.5l-1.4-1.425l2.8-2.8l.725.675l.725.7zM12 18q-2.5 0-4.25-1.75T6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18m0-2q1.65 0 2.825-1.175T16 12t-1.175-2.825T12 8T9.175 9.175T8 12t1.175 2.825T12 16m0-4"/></svg>',
    '空调': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M11.5 20q-1.25 0-2.125-.875T8.5 17h2q0 .425.288.713T11.5 18t.713-.288T12.5 17t-.288-.712T11.5 16H2v-2h9.5q1.25 0 2.125.875T14.5 17t-.875 2.125T11.5 20M2 10V8h13.5q.65 0 1.075-.425T17 6.5t-.425-1.075T15.5 5t-1.075.425T14 6.5h-2q0-1.475 1.013-2.488T15.5 3t2.488 1.013T19 6.5t-1.012 2.488T15.5 10zm16.5 8v-2q.65 0 1.075-.425T20 14.5t-.425-1.075T18.5 13H2v-2h16.5q1.475 0 2.488 1.013T22 14.5t-1.012 2.488T18.5 18"/></svg>',
    '空调开启': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M11.5 20q-1.25 0-2.125-.875T8.5 17h2q0 .425.288.713T11.5 18t.713-.288T12.5 17t-.288-.712T11.5 16H2v-2h9.5q1.25 0 2.125.875T14.5 17t-.875 2.125T11.5 20M2 10V8h13.5q.65 0 1.075-.425T17 6.5t-.425-1.075T15.5 5t-1.075.425T14 6.5h-2q0-1.475 1.013-2.488T15.5 3t2.488 1.013T19 6.5t-1.012 2.488T15.5 10zm16.5 8v-2q.65 0 1.075-.425T20 14.5t-.425-1.075T18.5 13H2v-2h16.5q1.475 0 2.488 1.013T22 14.5t-1.012 2.488T18.5 18"/></svg>',
    '中暑': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ --><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M15 6V5a3 3 0 1 0-6 0v6.348c0 .338-.175.648-.439.86a5.5 5.5 0 1 0 6.877 0c-.263-.212-.438-.522-.438-.86V10"/><path d="M14.5 16.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"/><path stroke-linecap="round" d="M12 14v-2m0-7v3"/></g></svg>',
    '晾晒': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><!-- Icon from Fluent UI System Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE --><path fill="currentColor" d="M8 3a1 1 0 0 0-.943.667a.5.5 0 0 1-.942-.334a2 2 0 1 1 3.22 2.157l-.041.037c-.22.197-.419.374-.57.566c-.16.198-.223.359-.223.503c0 .219.12.42.313.524L14.16 10a1.596 1.596 0 0 1-.757 3H2.595a1.595 1.595 0 0 1-.755-3l4.423-2.38a.5.5 0 0 1 .474.88l-4.424 2.38A.595.595 0 0 0 2.595 12h10.81a.596.596 0 0 0 .282-1.12L8.34 8a1.6 1.6 0 0 1-.84-1.404c0-.462.212-.839.44-1.126c.208-.261.468-.493.674-.677l.054-.048A1 1 0 0 0 8 3"/></svg>',
    '过敏': '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M10.586 2.5a2 2 0 0 1 2.701-.117l.127.117l1.627 1.626l.174-.242l.315-.453l.205-.308l.206-.329c.308-.48.677-.937 1.326-.758a1 1 0 0 1 .726.843L18 3v6a6 6 0 0 1-4.765 5.873l-.235.044v4a6.01 6.01 0 0 0 4.423-3.346a1 1 0 1 1 1.807.858A8 8 0 0 1 13 20.94c0 .566-.407 1.061-1 1.061s-1-.495-1-1.062a8 8 0 0 1-6.23-4.509a1 1 0 0 1 1.807-.858a6.01 6.01 0 0 0 4.17 3.298l.253.048v-4a6 6 0 0 1-4.995-5.67L6 9V3a1 1 0 0 1 .733-.964c.597-.165.959.212 1.254.649l.345.542l.138.204l.315.453l.174.242zM16 6.163c-.512.637-1.111 1.304-1.735 1.824C13.67 8.483 12.872 9 12 9s-1.67-.517-2.265-1.013c-.52-.433-1.022-.968-1.472-1.503L8 6.164V9a4 4 0 0 0 7.995.2L16 9zm-4-2.249l-1.774 1.774l.385.42c.4.424.911.892 1.389.892s.99-.468 1.39-.892l.384-.42z"/></g></svg>',
}
export { getWeather, getWeatherForecast };