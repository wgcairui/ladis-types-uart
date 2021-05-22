/// <reference types="node" />
declare namespace Uart {
    /** protocol */
    type communicationType = 232 | 485;
    type protocolType = "ups" | "air" | "em" | "th";
    type characterType = "utf8" | "hex" | "float" | "short" | "int" | "HX" | 'bit2'
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
        DevMac: String,
        pid: String,
        mountDev: String,
        protocol: String
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
    type logTerminalsType = "连接" | "断开" | "查询超时" | "查询恢复" | "操作设备" | "操作设备结果" | 'DTU操作' | "重新连接" | "dtu主动断开" | "dtu断开"
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
            touser: string
            template_id: string
            page?: string
            miniprogram_state?: 'developer' | 'trial' | 'formal'
            lang?: string
            miniprogram?: {
                appid: string
                pagepath?: string
            }
            data: {
                [x: string]: {
                    value: string
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
}
