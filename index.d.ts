/// <reference types="node" />
declare namespace Uart {


    /** protocol */
    type communicationType = 232 | 485;
    type protocolType = "ups" | "air" | "em" | "th";
    type characterType = "utf8" | "hex" | "float" | "short" | "int" | "HX" | 'bit2'
    type secretType = "mail" | "aliSms" | "hf" | "wxopen" | "wxmp" | "wxwp" | "wxmpValidaton"
    /**
    * 密匙,第三方应用密匙
    */
    interface Secret_app {
        type: secretType & string
        appid: string
        secret: string
    }


    /**
     * token信息
     */
    interface Token {
        type: string,
        token: string,
        expires: number,
        creatTime: number
    }

    interface ApolloMongoResult {
        msg: string
        ok: number
        n: number
        nModified: number
        upserted: any,
        arg?: any
    }


    /** apollo ctx */
    interface ApolloCtx extends UserInfo {
        loggedIn: boolean
        $Event: Event
        $token: string
        operationName: string
        req: Request
        language: string
    }

    /** page auery */
    interface PageQuery {
        DevMac: string,
        pid: string,
        mountDev: string,
        protocol: string
    }

    /**  协议指令解析格式化 */
    interface protocolInstructFormrize {
        name: string;
        enName?: string;
        regx: string | null;
        bl: string;
        unit: string | null;
        isState: boolean;
    }
    /** 协议指令 */
    interface protocolInstruct {
        name: string; // 指令名称--GQS
        resultType: characterType;
        shift: boolean;
        shiftNum: number;
        pop: boolean;
        popNum: number;
        isSplit: boolean
        resize: string;
        formResize: protocolInstructFormrize[];
        // 加入指令是否启用
        isUse: boolean,
        // 非标协议
        noStandard: boolean,
        // 前处理脚本
        scriptStart: string,
        // 后处理脚本
        scriptEnd: string
    }
    /** 协议 */
    interface protocol {
        Type: communicationType;
        Protocol: string;
        ProtocolType: protocolType;
        instruct: protocolInstruct[];
    }
    /** 设备类型 */
    interface DevsType {
        Type: string;
        DevModel: string;
        Protocols: {
            Type: communicationType;
            Protocol: string;
        }[];
    }
    /** 登记注册终端 */
    interface RegisterTerminal {
        DevMac: string;
        mountNode: string;
    }
    /** 终端挂载设备 */
    interface TerminalMountDevs {
        Type: string
        online?: boolean
        mountDev: string;
        protocol: string;
        pid: number;
    }
    /** 终端 */
    interface Terminal extends RegisterTerminal {
        tag?: string[];
        DevMac: string
        online?: boolean
        disable?: boolean
        mountNode: string
        name: string;
        ip?: string
        port?: number

        AT?: boolean
        jw?: string;
        uart?: string
        uptime?: string
        PID?: string,
        ver?: string,
        Gver?: string,
        iotStat?: string,
        ICCID?: string
        mountDevs: TerminalMountDevs[];
    }
    interface TerminalMountDevsEX extends TerminalMountDevs {
        TerminalMac: string
        Interval: number
    }
    /** Node节点 */
    interface NodeClient {
        Name: string;
        IP: string;
        Port: number;
        MaxConnections: number;
        count?: number
    }
    /** 用户绑定设备 */
    interface BindDevice {
        user: string
        ECs: string[]
        UTs: (string | Terminal)[]
        AGG: string[]
    }

    /** Node节点硬件top */
    interface SocketRegisterInfo {
        hostname: string;
        totalmem: string;
        freemem: string;
        loadavg: number[];
        type: string;
        uptime: string;
        userInfo: {
            uid: number,
            gid: number,
            username: string,
            homedir: string,
            shell: string
        }
    }
    /** 对节点发出的协议查询指令 */
    interface queryObject {
        mac: string;
        type: number;
        mountDev: string
        protocol: string;
        pid: number;
        timeStamp: number;
        content: string | string[];
        Interval: number
        useTime: number
    }
    /** 协议查询结果解析存储结构 */
    interface queryResultArgument {
        name: string;
        value: any;
        parseValue: string;
        unit: string | null;
        issimulate?: boolean
        alarm?: boolean
        alias?: string
    }
    //
    interface queryResultParse {
        [x: string]: queryResultArgument
    }
    /** 协议查询结果 */
    interface queryResult extends queryObject {
        contents: IntructQueryResult[]
        result?: queryResultArgument[];
        time?: string;
        useBytes?: number
    }
    interface IntructQueryResult {
        content: string
        buffer: {
            data: number[];
            type: string;
        };
    }
    //
    interface timelog {
        content: string,
        num: number
    }

    /** UartData数据 */
    interface uartData extends NodeClient {
        data: queryResult[]
    }

    /** 透传 api 数据   */
    interface socketNetInfo {
        ip: string;
        port: number;
        mac: string;
        jw: string;
        uart: string
        AT: boolean
        ICCID: string
        connecting: boolean,
        lock: boolean
        PID: string
        ver: string
        Gver: string
        iotStat: string

    }
    /** 节点websocket透传信息 */
    interface WebSocketInfo {
        NodeName: string;
        Connections: number | Error;
        SocketMaps: socketNetInfo[];
    }
    /** 节点上传信息 */
    interface nodeInfo {
        hostname: string;
        totalmem: string;
        freemem: string;
        loadavg: number[];
        usemen?: number
        usecpu?: number
        type: string;
        uptime: string;
        version: string
    }

    type registerType = "wx" | "web" | "app"

    /** 用户信息 */
    interface UserInfo {
        avanter?: string
        userId: string
        name?: string;
        user: string;
        userGroup?: string;
        passwd?: string;
        mail?: string;
        company?: string;
        tel?: number;
        creatTime?: Date;
        modifyTime?: Date;
        address?: string;
        status?: boolean;
        // 注册类型
        rgtype: registerType
        /**
         * 小程序id
         */
        wpId?: string,
        /**
         * 公众号id
         */
        wxId?: string,
        /**
         * 开放平台id
         */
        openId?: string
    }

    // 设备协议参数-常量
    // 空调
    interface DevConstant_Air {
        Switch: string
        WorkMode: string
        //热通道温度
        HeatChannelTemperature: string;
        HeatChannelHumidity: string;
        //冷通道湿度
        ColdChannelTemperature: string;
        ColdChannelHumidity: string;
        //制冷温度
        RefrigerationTemperature: string;
        RefrigerationHumidity: string;
        // 风速
        Speed: string;
    }
    // EM
    interface DevConstant_EM {
        battery: string
        voltage: string[],
        current: string[],
        factor: string[]
    }
    // UPS
    interface DevConstant_Ups {
        Switch: string
        WorkMode: string
        UpsStat: string[]
        BettyStat: string[]
        InputStat: string[]
        OutStat: string[]
    }
    // TH
    interface DevConstant_TH {
        Temperature: string;
        Humidity: string;
    }
    // IO
    interface DevConstant_IO {
        di: string[];
        do: string[];
    }
    interface DevConstant extends DevConstant_Air, DevConstant_EM, DevConstant_TH, DevConstant_Ups, DevConstant_IO { }
    // 协议参数阀值
    interface Threshold {
        name: string
        min: number
        max: number
    }
    // 协议参数告警状态
    interface ConstantAlarmStat extends queryResultArgument {
        alarmStat: string[]
    }
    // 协议操作指令
    interface OprateInstruct {
        name: string
        value: string
        bl: string
        val?: number
        readme: string
        tag: string
    }
    // 协议参数-常量参数阀值
    interface ProtocolConstantThreshold {
        Protocol: string,
        ProtocolType: string,
        Constant: DevConstant
        Threshold: Threshold[]
        AlarmStat: ConstantAlarmStat[]
        ShowTag: string[]
        OprateInstruct: OprateInstruct[]
    }
    interface alias {
        name: string,
        alias: string
    }
    // 相同设备下的参数字段别名
    interface DevArgumentAlias {
        mac: string,
        pid: number,
        protocol: string,
        alias: alias[]
    }
    // 用户自定义配置
    interface userSetup {
        user: string
        tels: string[]
        mails: string[]
        ProtocolSetup: ProtocolConstantThreshold[]
        ProtocolSetupMap: Map<string, ProtocolConstantThreshold>
        ShowTagMap: Map<string, Set<string>>
        ThresholdMap: Map<string, Map<string, Threshold>>
        AlarmStateMap: Map<string, Map<string, ConstantAlarmStat>>
    }
    // 协议解析结果集
    interface queryResultSave {
        [x: string]: any;
        mac: string
        pid: number
        timeStamp: number
        result: queryResultArgument[]
        parse: queryResultParse
        Interval: number,
        useTime: number,
        time: string
    }
    type ConstantThresholdType = "Threshold" | "Constant" | "ShowTag" | "Oprate" | "AlarmStat"
    // 操作指令查询对象
    interface instructQueryArg extends queryResultArgument {
        DevMac: string
        pid: number,
        mountDev: string
        protocol: string
    }
    // 操作指令请求对象
    interface instructQuery {
        protocol: string
        DevMac: string
        pid: number
        type: number
        events: string
        content: string
        result?: Buffer
        Interval?: number
    }

    // 透传设备告警对象
    interface uartAlarmObject {
        parentId?: string
        mac: string
        devName: string
        pid: number
        protocol: string
        tag: string
        timeStamp: number
        msg: string
        isOk?: boolean
    }

    // 单条发送短信
    type UartAlarmType = "透传设备下线提醒" | "透传设备上线提醒" | '透传设备告警'
    interface smsUartAlarm {
        parentId?: string
        user: string
        tel: string
        name: string
        devname: string
        air?: string
        event?: string
        type: UartAlarmType
    }
    // LOG 日志
    // 短信发送
    interface logSmsSend {
        tels: string[]
        sendParams: {
            RegionId: string
            PhoneNumbers: string
            SignName: string
            TemplateCode: string
            TemplateParam: String
        },
        Success?: {
            Message: string
            RequestId: string
            BizId: string
            Code: string
        },
        Error?: any
    }
    // 邮件
    interface mailResponse {
        accepted: string[]
        rejected: string[],
        envelopeTime: number
        messageTime: number
        messageSize: number
        response: string
        envelope: { from: string, to: string[] },
        messageId: string
    }

    interface logMailSend {
        mails: string[]
        sendParams: {
            from: string
            to: string
            subject: string
            html: string
        }
        Success?: mailResponse
        Error?: any
    }
    // 操作请求
    interface logUserRequst {
        user: string,
        userGroup: string,
        type: string,
        argument?: any
    }
    type logLogins = "用户登陆" | '用户登出' | '用户注册' | "用户重置密码" | "用户修改信息"
    // 用户登陆登出请求
    interface logUserLogins {
        user: string,
        type: logLogins,
        address: string
        msg: string
    }
    // 节点连接断开等事件
    type logNodesType = "连接" | "断开" | "上线" | "重新上线" | "非法连接请求" | "TcpServer启动失败" | "告警" | "重新连接" | "节点断开" | "dtu主动断开" | "dtu断开"
    interface logNodes {
        ID: string
        IP: string
        Name: string
        type: logNodesType
    }
    // 终端连接
    type logTerminalsType = "连接" | "断开" | "查询超时" | "查询恢复" | "操作设备" | "操作设备结果" | 'DTU操作' | "重新连接" | "节点断开" | "dtu主动断开" | "dtu断开"
    interface logTerminals {
        NodeIP: string
        NodeName: string
        TerminalMac: string
        type: logTerminalsType
        msg?: string
        query?: any
        result?: any
        createdAt?: Date
    }

    // 设备流量使用量
    interface logTerminaluseBytes {
        mac: string
        date: string
        useBytes: number
    }

    // 设备流量使用量
    interface logDtuBusy {
        mac: string
        stat: boolean
        n: number
        timeStamp: number
    }

    // 聚合设备
    interface AggregationDev extends TerminalMountDevs {
        result: queryResultArgument[] | undefined;
        DevMac: string
        name: string
        online: boolean
    }
    interface AggregationDevParse {
        pid: number,
        DevMac: string,
        name: string,
        Type: string,
        mountDev: string,
        protocol: string,
        parse: { [x: string]: queryResultArgument }
    }
    interface Aggregation {
        user: string
        id: string
        name: string
        aggregations: AggregationDev[]
        devs: AggregationDevParse[]
    }




    type AT = 'Z' | 'VER' | 'UART=1' | 'LOCATE=1' | 'IMEI' | 'ICCID' | 'IMSI'
    // 操作指令请求对象
    interface DTUoprate {
        DevMac: string
        events: string
        content: AT | string
        result?: string
    }

    // agg聚合设备布局对象
    interface AggregationLayoutNode {
        x: number
        y: number
        id: string
        name: string
        bind: {
            mac: string,
            pid: number,
            name: string
        }
        color: string
        result?: queryResultArgument
    }

    // 用户布局设置
    interface userLayout {
        user: string,
        type: string,
        id: string,
        bg: string,
        Layout: AggregationLayoutNode[]
    }
    /**
     * 微信服务端类型
     */
    namespace WX {
        /**
         * wx返回结果报错信息
         */
        interface wxRequest {
            errcode?: number
            errmsg?: string
            [x: string]: any
        }


        interface wxValidation {
            signature: string,
            timestamp: string,
            nonce: string,
            echostr: string
        }

        /**
         * 关注,取消关注
         * https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_event_pushes.html
         */
        type pushEvent = 'subscribe' | 'unsubscribe' | 'SCAN' | 'LOCATION' | 'CLICK' | 'VIEW'

        /**
         * 服务端接收的微信事件推送
         */
        interface WxEvent {
            /**
             * 开发者 微信号
             */
            ToUserName: string,
            /**
             * 发送方帐号（一个OpenID）
             */
            FromUserName: string,
            /**
             * 消息创建时间 （整型）
             */
            CreateTime: string,
            /**
             * 消息类型，event
             */
            MsgType: string,
            /**
             * 事件类型，VIEW
             */
            Event?: pushEvent & string,
            /**
             * 事件KEY值，设置的跳转URL
             */
            EventKey?: string
            /**
             * 文本消息内容
             */
            Content?: string
            /**
             * 指菜单ID，如果是个性化菜单，则可以通过这个字段，知道是哪个规则的菜单被点击了
             */

            MenuID?: string
            /**
             * 扫描信息
             */
            ScanCodeInfo?: any
            /**
             * 扫描类型，一般是qrcode
             */
            ScanType?: string,
            /**
             * 扫描结果，即二维码对应的字符串信息
             */
            ScanResult?: string
            /**
             * 发送的图片信息
             */
            SendPicsInfo?: any
            /**
             * 发送的图片数量
             */
            Count?: number,
            /**
             * 图片列表
             */
            PicList?: any[],
            /**
             * 图片的MD5值，开发者若需要，可用于验证接收到图片
             */
            PicMd5Sum?: string
            /**
             * 二维码ticket
             */
            Ticket?: string
        }

        /**
            * 生成带参数的二维码
            * https://developers.weixin.qq.com/doc/offiaccount/Account_Management/Generating_a_Parametric_QR_Code.html
        */
        interface ticketPublic extends wxRequest {
            /**
             * 获取的二维码ticket，凭借此ticket可以在有效时间内换取二维码
             */
            ticket: string
            /**
             * 该二维码有效时间，以秒为单位。 最大不超过2592000（即30天）
             */
            expire_seconds: number,
            /**
             * 二维码图片解析后的地址，开发者可根据该地址自行生成需要的二维码图片
             */
            url: string
        }

        /**
         * 永久消息素材列表
         */
        interface materials_list extends wxRequest {
            /**
             * 该类型的素材的总数
             */
            "total_count": number
            /**
             * 本次调用获取的素材的数量
             */
            "item_count": number
            "item": {
                "media_id": string
                "content"?: {
                    "news_item": {
                        /**
                         * 图文消息的标题
                         */
                        "title": string
                        /**
                         * 图文消息的封面图片素材id（必须是永久mediaID）
                         */
                        "thumb_media_id": string
                        /**
                         * 是否显示封面，0为false，即不显示，1为true，即显示
                         */
                        "show_cover_pic": string
                        /**
                         * 作者
                         */
                        "author": string
                        /**
                         * 图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空
                         */
                        "digest": string
                        /**
                         * 图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS
                         */
                        "content": string
                        /**
                         * 图文页的URL，或者，当获取的列表是图片素材列表时，该字段是图片的URL
                         */
                        "url": string
                        /**
                         * 图文消息的原文地址，即点击“阅读原文”后的URL
                         */
                        "content_source_url": string
                    }[]
                }
                /**
                 * 文件名称
                 */
                "name"?: string
                /**
                 * 图文页的URL，或者，当获取的列表是图片素材列表时，该字段是图片的URL
                 */
                "url"?: string
                /**
                 * 这篇图文消息素材的最后更新时间
                 */
                "update_time": string
            }[]
        }

        /**
         * 微信网页授权登录
         * https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
         */
        interface webLogin extends wxRequest {
            /**
             * 接口调用凭证
             */
            "access_token": string
            /**
             * access_token接口调用凭证超时时间，单位（秒）
             */
            "expires_in": number
            /**
             * 用户刷新access_token
             */
            "refresh_token": string
            /**
             * 授权用户唯一标识
             */
            "openid": string
            /**
             * 用户授权的作用域，使用逗号（,）分隔
             */
            "scope": string
            /**
             * 当且仅当该网站应用已获得该用户的userinfo授权时，才会出现该字段。
             */
            "unionid"?: string
        }

        /**
         * 微信开发者返回的用户信息
         */
        interface webUserInfo extends wxRequest {
            /**
             * 普通用户的标识，对当前开发者帐号唯一
             */
            "openid": string
            /**
             * 普通用户昵称
             */
            "nickname": string
            /**
             * 普通用户性别，1为男性，2为女性
             */
            "sex": 0 | 1 | 2
            /**
             * 普通用户个人资料填写的省份
             */
            "province": string
            /**
             * 普通用户个人资料填写的城市
             */
            "city": string
            /**
             * 国家，如中国为CN
             */
            "country": string
            /**
             * 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空
             */
            "headimgurl": string
            /**
             * 用户特权信息，json数组，如微信沃卡用户为（chinaunicom）
             */
            "privilege": string[]
            /**
             * 用户统一标识。针对一个微信开放平台帐号下的应用，同一用户的unionid是唯一的。
             */
            "unionid": string

        }


        interface menu_sub {
            /**
             * 菜单的响应动作类型，view表示网页类型，click表示点击类型，miniprogram表示小程序类型
             */
            type: "click" | 'view' | 'miniprogram' | 'scancode_push' | 'scancode_waitmsg' | 'pic_sysphoto' | 'pic_photo_or_album' | 'pic_weixin' | 'location_select' | 'media_id' | 'view_limited',
            /**
             * 菜单标题，不超过16个字节，子菜单不超过60个字节
             */
            name: string,
            /**
             * 菜单KEY值，用于消息接口推送，不超过128字节
             */
            key?: string,
            /**
             * view、miniprogram类型必须
             * 网页 链接，用户点击菜单可打开链接，不超过1024字节。 type为miniprogram时，不支持小程序的老版本客户端将打开本url
             */
            url?: string,
            /**
             * miniprogram类型必须
             * 小程序的appid（仅认证公众号可配置）
             */
            appid?: string,
            /**
             * miniprogram类型必须
             * 小程序的页面路径
             */
            pagepath?: string
            /**
             * media_id类型和view_limited类型必须
             * 调用新增永久素材接口返回的合法media_id
             */
            media_id?: string
        }

        /**
         * 公众号自定义菜单接口
         * https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Creating_Custom-Defined_Menu.html
         */
        interface menu {
            /**
             * 一级菜单数组，个数应为1~3个
             */
            button: {
                name: string,
                /**
                 * 二级菜单数组，个数应为1~5个
                 */
                sub_button: menu_sub[]
            }[]
        }

        interface userInfoPublic extends webUserInfo {
            /**
             * 用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息
             */
            "subscribe": 0 | 1
            /**
             * 用户的标识，对当前公众号唯一
             */
            "openid": string
            /**
             * 用户的昵称
             */
            "nickname": string
            /**
             * 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
             */
            "sex": 0 | 1 | 2,
            /**
             * 用户的语言，简体中文为zh_CN
             */
            "language": string
            /**
             * 用户所在城市
             */
            "city": string
            /**
             * 用户所在省份
             */
            "province": string
            /**
             * 用户所在国家
             */
            "country": string
            /**
             * 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
             */
            "headimgurl": string
            /**
             * 用户关注时间，为时间戳。如果用户曾多次关注，则取最后关注时间
             */
            "subscribe_time": number
            /**
             * 只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。
             */
            "unionid": string
            /**
             * 公众号运营者对粉丝的备注，公众号运营者可在微信公众平台用户管理界面对粉丝添加备注
             */
            "remark": string
            /**
             * 用户所在的分组ID（兼容旧的用户分组接口）
             */
            "groupid": number
            /**
             * 户被打上的标签ID列表
             */
            "tagid_list": number[]
            /**
             * 返回用户关注的渠道来源，ADD_SCENE_SEARCH 公众号搜索，ADD_SCENE_ACCOUNT_MIGRATION 公众号迁移，ADD_SCENE_PROFILE_CARD 名片分享，ADD_SCENE_QR_CODE 扫描二维码，ADD_SCENE_PROFILE_LINK 图文页内名称点击，ADD_SCENE_PROFILE_ITEM 图文页右上角菜单，ADD_SCENE_PAID 支付后关注，ADD_SCENE_WECHAT_ADVERTISEMENT 微信广告，ADD_SCENE_OTHERS 其他
             */
            "subscribe_scene": "ADD_SCENE_SEARCH" | "ADD_SCENE_ACCOUNT_MIGRATION" | "ADD_SCENE_PROFILE_CARD" | "ADD_SCENE_QR_CODE" | "ADD_SCENE_PROFILE_LINK" | "ADD_SCENE_PROFILE_ITEM" | "ADD_SCENE_PAID" | "ADD_SCENE_WECHAT_ADVERTISEMENT" | "ADD_SCENE_OTHERS"
            "qr_scene": number
            "qr_scene_str": string
        }


        /**
         * 公众号用户列表
         */
        interface userlistPublic extends wxRequest {
            /**
             * 关注该公众账号的总用户数
             */
            "total": number
            /**
             * 拉取的OPENID个数，最大值为10000
             */
            "count": number
            /**
             * 列表数据，OPENID的列表
             */
            "data": {
                "openid": string[]
            },
            /**
             * 拉取列表的最后一个用户的OPENID
             */
            "next_openid": string
        }

        /**
         * 微信服务端返回的appid 
         * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
         */

        interface wxRequestCode2Session extends wxRequest {
            openid: string
            session_key: string
            unionid: string
        }
        /**
         * 微信服务端返回的session
         *  https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html 
         */

        interface wxRequestAccess_token extends wxRequest {
            access_token: string
            expires_in: number
        }
        /**
         * 微信小程序订阅消息
         * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html
         */

        interface wxsubscribeMessage {
            /**
             * 接收者openid
             */
            touser: string
            /**
             * 模板ID
             */
            template_id: string
            /**
             * 模板跳转链接（海外帐号没有跳转能力）
             */
            url?: string
            /**
             * 
             */
            page?: string
            /**
             * 
             */
            miniprogram_state?: 'developer' | 'trial' | 'formal'
            lang?: string
            /**
             * 跳小程序所需数据，不需跳小程序可不用传该数据
             */
            miniprogram?: {
                /**
                 * 所需跳转到的小程序appid（该小程序appid必须与发模板消息的公众号是绑定关联关系，暂不支持小游戏）
                 */
                appid: string
                /**
                 * 所需跳转到小程序的具体页面路径，支持带参数,（示例index?foo=bar），要求该小程序已发布，暂不支持小游戏
                 */
                pagepath?: string
            }

            /**
             * 模板数据
             */
            data: {
                /**
                 * 参数名称
                 */
                [x: string]: {
                    /**
                     * 参数的值
                     */
                    value: string
                    /**
                     * 模板内容字体颜色，不填默认为黑色
                     */
                    color?: string
                }
            }
        }
        /**
         * 公众号行业
         */
        interface wxRequest_industry extends wxRequest {
            primary_industry: {
                "first_class": string,
                "second_class": string
            },
            secondary_industry: {
                "first_class": string,
                "second_class": string
            }
        }

        /** 
         * 微信url码请求格式
         * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/url-scheme/urlscheme.generate.html
         */
        interface urlScheme {
            access_token: string,
            "jump_wxa": {
                "path"?: string
                "query"?: string
            }
            "is_expire"?: boolean
            "expire_time"?: number
        }

        /**
         * 微信url码结果
         */
        interface urlSchemeRequest extends wxRequest {
            openlink: string
        }
    }

    namespace AMap {
        interface statu {
            status: "0" | "1",
            info: "OK" | string,
            infocode: "10000" | string
        }

        interface ip2parameters extends statu {
            province: string,
            city: string
            adcode: string
            rectangle: string
        }

        interface convert extends statu {
            locations: string
        }
    }

    namespace VeChart {
        interface unit {
            name: string
            data: number | number[] | any
        }
        interface stand {
            dimensions?: {
                name: string
                data: (string | number)[]
            }
            measures: unit[]
        }

        interface line extends stand {
            dimensions: {
                name: string
                data: (string | number)[]
            }
            measures: {
                name: string
                data: number[]
            }[]
        }

        type pie = line
        interface guageData extends stand {
            dimensions?: {
                name: string
                data: (string | number)[]
            }
            measures: {
                name: string
                data: {
                    name: string,
                    value: number
                }[]
            }[]
        }
    }
}
