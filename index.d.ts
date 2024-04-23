declare namespace Uart {


    /** protocol */
    type communicationType = 232 | 485;
    type protocolType = "ups" | "air" | "em" | "th" | 'io';
    type characterType = "utf8" | "hex" | "float" | "short" | "int" | "HX" | 'bit2'
    type secretType = "mail" | "aliSms" | "hf" | "wxopen" | "wxmp" | "wxwp" | "wxmpValidaton" | 'dyIot'

    /**
     * 数据库标识
     */
    interface id {
        _id?: string
    }

    /**
    * 密匙,第三方应用密匙
    */
    interface Secret_app extends id {
        /**
         * 三方服务类型
         */
        type: secretType
        /**
         * appid
         */
        appid: string
        /**
         * secret
         */
        secret: string
    }



    /**
     * token信息
     */
    interface Token {
        /**
         * token类型
         */
        type: string,
        /**
         * token
         */
        token: string,
        /**
         * 过期时间
         */
        expires: number,
        /**
         * 生成时间
         */
        creatTime: number
    }

    /**
     * mongo操作返回信息
     */
    interface ApolloMongoResult {
        msg: string
        ok: number
        n: number
        nModified: number
        upserted: any,
        arg?: any
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
        /**
         * 参数名称
         */
        name: string;
        /**
         * 参数英文名
         */
        enName?: string;
        /**
         * 参数分割规则
         * 2-2标识从解析数据第二位开始读取,长度2
         */
        regx: string | null;
        /**
         * 系数,用于乘除读取的值
         */
        bl: string;
        /**
         * 单位
         */
        unit: string | null;
        /**
         * 是否是解析值{}
         */
        isState: boolean;
    }

    /** 协议指令 */
    interface protocolInstruct {
        /**
         * 指令名称--GQS
         */
        name: string;
        /**
         * 返回数据类型
         */
        resultType: characterType;
        /**
         * 是否去头
         */
        shift: boolean;
        /**
         * 去头长度
         */
        shiftNum: number;
        /**
         * 是否去尾
         */
        pop: boolean;
        /**
         * 去尾长度
         */
        popNum: number;
        /**
         * 232 是否分割,默认空格分割
         */
        isSplit: boolean
        /**
         * 解析规则原始字符串表达
         */
        resize: string;
        /**
         * 解析规则
         */
        formResize: protocolInstructFormrize[];
        /**
         * 加入指令是否启用
         */
        isUse: boolean,
        /**
         * 非标协议
         */
        noStandard: boolean,
        /**
         * 前处理脚本
         * @Func  function(pid,instruct)=>string
         * 输入 pid和指令,函数处理字符串,返回正确指令
         * @see const content = ('AA' + pid.toString(16).padStart(2, '0') + instruct).replace(/\s*\/g, '')
            const num = 255 - (Buffer.from(content, 'hex').toJSON().data.reduce((pre, cur) => pre + cur))
            const crc = Buffer.allocUnsafe(2)
            crc.writeInt16BE(num, 0)
            return content + crc.slice(1, 2).toString('hex').padStart(2, '0')
         */
        scriptStart: string,
        /**
         * 后处理脚本
         * @Func  function(content,arr)=>boolen
         * arr是设备返回的数据,content是指令
         * arr[0] === 85
         */
        scriptEnd: string
        /**
         * 备注
         */
        remark?: string
    }

    /** 协议 */
    interface protocol extends id {
        /**
         * 协议类型,232/485
         */
        Type: communicationType;
        /**
         * 协议名称
         */
        Protocol: string;
        /**
         * 设备类型
         */
        ProtocolType: protocolType;
        /**
         * 协议指令
         */
        instruct: protocolInstruct[];
        /**
         * 备注
         */
        remark?: string
    }

    /** 设备类型 */
    interface DevsType extends id {
        /**
         * 设备类型
         */
        Type: string;
        /**
         * 名称
         */
        DevModel: string;
        /**
         * 包含协议
         */
        Protocols: {
            Type: communicationType;
            Protocol: string;
        }[];
        /**
         * 备注
         */
        remark?: string
    }

    /** 登记注册终端 */
    interface RegisterTerminal extends id {
        /**
         * 设备mac
         */
        DevMac: string;
        /**
         * 挂载节点
         */
        mountNode: string;
        /**
         * 绑定安装设备编号Í
         */
        bindDev?: string;
        /**
         * 备注
         */
        remark?: string
    }
    /** 终端挂载设备 */
    interface TerminalMountDevs {
        /**
         * 设备类型
         */
        Type: string
        /**
         * 在线状态
         */
        online?: boolean
        /**
         * 设备名称
         */
        mountDev: string;
        /**
         * 设备协议
         */
        protocol: string;
        /**
         * 设备地址
         */
        pid: number;
        /**
         * 绑定安装设备编号Í
         */
        bindDev?: string;
    }

    /**
     * iccd物联卡信息
     */
    interface iccidInfo {
        /**
         * 状态
         */
        statu: boolean
        /**
         * 自动续费
         */
        IsAutoRecharge:boolean
        /**
         * 语音套餐总量，以分钟为单位
         */
        // voiceTotal: number,
        /**
         * 	资源失效日期
         */
        expireDate: string,
        /**
         * 资源名称
         */
        resName: string,
        /**
         * 资源类型编码。6700001代表流量
         */
        //resourceType: string,
        /**
         * 资源使用量，流量单位为KB
         */
        flowUsed: number,
        /**
         * 资源剩余量，流量单位为KB
         */
        restOfFlow: number,
        /**
         * 短信使用量。以条为单位
         */
        // smsUsed: number,
        /**
         * 资源生效日期
         */
        // validDate: string,
        /**
         * 语音使用量，以分钟为单位
         */
        // voiceUsed: number,
        /**
         * 资源总量 ，流量单位为KB
         */
        flowResource: number
        /**
         * 版本
         */
        version: string
    }
    /** 终端 */
    interface Terminal extends RegisterTerminal {
        /**
         * 标签
         */
        tag?: string[];
        /**
         * mac/IMEI
         */
        DevMac: string
        /**
         * 在线状态
         */
        online?: boolean
        /**
         * 禁用状态
         */
        disable?: boolean
        /**
         * 挂载节点
         */
        mountNode: string
        /**
         * 模块名称
         */
        name: string;
        /**
         * 模块ip
         */
        ip?: string
        /**
         * 模块端口
         */
        port?: number
        /**
         * AT指令支持
         * @link https://www.ladishb.com//upload/8_7_2021_4G_2G_NB_DTU%E4%BA%A7%E5%93%81%E5%8A%9F%E8%83%BD.pdf
         */
        AT?: boolean
        /**
         * 定位
         */
        jw?: string;
        /**
         * 通讯参数
         */
        uart?: string
        /**
         * 更新时间
         */
        uptime?: string
        /**
         * 模块型号
         */
        PID?: string,
        /**
         * 模块版本
         */
        ver?: string,
        /**
         * 4g模块版本
         */
        Gver?: string,
        /**
         * iot状态
         */
        iotStat?: string,
        /**
         * sim卡卡号
         */
        ICCID?: string
        /**
         * 挂载子设备
         */
        mountDevs: TerminalMountDevs[];



        /**
         * iccid信息
         */
        iccidInfo?: iccidInfo

        /**
         * 设备是否分享
         * 2.0.1
         */
        share?: boolean

        /**
         * 4g信号强度
         * 2.0.1
         */
        signal?: number
    }

    /**
     * 挂载设备拓展
     */
    interface TerminalMountDevsEX extends TerminalMountDevs {
        /**
         * mac
         */
        TerminalMac: string
        /**
         * 查询间隔
         */
        Interval: number
    }

    /**
     * 注册设备
     */
    interface registerDev extends TerminalMountDevs {
        id: string
    }

    /** Node节点 */
    interface NodeClient extends id {
        /**
         * 节点名称
         */
        Name: string;
        /**
         * 节点IP
         */
        IP: string;
        /**
         * 节点监听端口
         */
        Port: number;
        /**
         * 节点最大挂载数量
         */
        MaxConnections: number;
        /**
         * 节点一挂在数量
         */
        count?: number
        /**
         * 备注
         */
        remark?: string
    }


    /** 用户绑定设备 */
    interface BindDevice extends id {
        /**
         * 用户
         */
        user: string
        /**
         * 环控设备
         */
        ECs: string[]
        /**
         * 分享的环控设备
         */
        ECsShare: string[]
        /**
         * 透传设备
         */
        UTs: string[]
        /**
         * 分享的透传设备
         */
        UTsShare: string[]
        /**
         * 聚合设备
         */
        AGG: string[]
        /**
         * 分享的聚合设备
         */
        AGGShare: string[]

        bind?: {
            UTs: Terminal[],
            [x: string]: any
        }
    }

    /** Node节点硬件top */
    interface SocketRegisterInfo {
        /**
         * 系统名称
         */
        hostname: string;
        /**
         * 内存总量
         */
        totalmem: string;
        /**
         * 空闲内存
         */
        freemem: string;
        /**
         * cpu
         */
        loadavg: number[];
        /**
         * 系统类型
         */
        type: string;
        /**
         * 更新时间
         */
        uptime: string;
        /**
         * 运行用户信息
         */
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
        /**
         * mac
         */
        mac: string;
        /**
         * 协议类型
         */
        type: number;
        /**
         * 挂载设备名称
         */
        mountDev: string
        /**
         * 协议
         */
        protocol: string;
        /**
         * 设备地址
         */
        pid: number;
        /**
         * 时间戳
         */
        timeStamp: number;
        /**
         * 查询指令
         */
        content: string | string[];
        /**
         * 查询间隔
         */
        Interval: number
        /**
         * 查询耗时
         */
        useTime: number
    }

    /** 协议查询结果解析存储结构 */
    interface queryResultArgument {
        /**
         * 参数名
         */
        name: string;
        /**
         * 参数序列化值
         */
        value: any;
        /**
         * 参数解析值
         */
        parseValue: string;
        /**
         * 单位
         */
        unit: string | null;
        /**
         * 是否是json值
         */
        issimulate?: boolean
        /**
         * 是否告警
         */
        alarm?: boolean
        /**
         * 别名
         */
        alias?: string
    }

    /** 协议查询结果 */
    interface queryResult extends queryObject {
        /**
         * 查询指令
         */
        contents: IntructQueryResult[]
        /**
         * 查询结果
         */
        result?: queryResultArgument[];
        /**
         * 时间
         */
        time?: string;
        /**
         * 消耗字节数,仅参考
         */
        useBytes?: number
    }

    /**
     * 
     */
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

    /** 
     * UartData数据 
     * 
     * */
    interface uartData extends NodeClient {
        data: queryResult[]
    }

    /** 
     * 透传 api 数据  
     * 透传模块参数
     * */
    interface socketNetInfo {
        /**
         * ip
         */
        ip: string;
        /**
         * 端口
         */
        port: number;
        /**
         * mac
         */
        mac: string;
        /**
         * 定位
         */
        jw: string;
        /**
         * 通讯参数
         */
        uart: string
        /**
         * at支持
         */
        AT: boolean
        /**
         * sim卡号
         */
        ICCID: string
        /**
         * 连接状态
         */
        connecting: boolean,
        /**
         * 透传查询锁状态
         */
        lock: boolean
        /**
         * 模块型号
         */
        PID: string
        /**
         * 固件版本
         */
        ver: string
        /**
         * 4G固件版本
         */
        Gver: string
        /**
         * iot信息,默认关闭iot
         */
        iotStat: string

    }

    /** 节点websocket透传信息 */
    interface WebSocketInfo {
        /**
         * 节点名称
         */
        NodeName: string;
        /**
         * 节点连接数
         */
        Connections: number | Error;
        /**
         * 
         */
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

    type registerType = "wx" | "web" | "app" | "pesiv"

    /** 用户信息 */
    interface UserInfo extends id {
        /**
         * 头像链接
         */
        avanter?: string
        /**
         * 用户id
         */
        userId: string
        /**
         * 昵称
         */
        name?: string;
        /**
         * 用户名
         */
        user: string;
        /**
         * 用户组
         */
        userGroup?: string;
        /**
         * 密码
         */
        passwd?: string;
        /**
         * 邮件
         */
        mail?: string;
        /**
         * 组织
         */
        company?: string;
        /**
         * 电话
         */
        tel?: number;
        /**
         * 创建时间
         */
        creatTime?: Date;
        /**
         * 修改时间,每次登录会变更
         */
        modifyTime?: Date;
        /**
         * 登录ip
         */
        address?: string;
        /**
         * 启用状态
         */
        status?: boolean;
        /**
         * 注册类型
         */
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
        /**
         * proxy转发域名
         */
        proxy?: string
        /**
         * 备注
         */
        remark?: string
    }

    /**
     * 设备协议参数-常量
    // 空调
     */
    interface DevConstant_Air {
        /**
         * 开关
         */
        Switch: string
        /**
         * 工作模式
         */
        WorkMode: string
        /**
         * 热通道温湿度
         */
        HeatChannelTemperature: string;
        HeatChannelHumidity: string;
        /**
         * 冷通道温湿度
         */
        ColdChannelTemperature: string;
        ColdChannelHumidity: string;
        /**
         * 制冷温度
         */
        RefrigerationTemperature: string;
        RefrigerationHumidity: string;
        /**
         * 风速
         */
        Speed: string;
    }

    /**
     * EM
     */
    interface DevConstant_EM {
        /**
         * 电量
         */
        battery: string
        /**
         * 电压
         */
        voltage: string[],
        /**
         * 电流
         */
        current: string[],
        /**
         * 频率
         */
        factor: string[]
    }

    /**
     * UPS
     */
    interface DevConstant_Ups {
        /**
         * 开关
         */
        Switch: string
        /**
         * 工作模式
         */
        WorkMode: string
        /**
         * ups状态
         */
        UpsStat: string[]
        /**
         * 电池状态
         */
        BettyStat: string[]
        /**
         * 输入状态
         */
        InputStat: string[]
        /**
         * 输出状态
         */
        OutStat: string[]
    }
    /**
     * TH
     */
    interface DevConstant_TH {
        /**
         * 温度
         */
        Temperature: string;
        /**
         * 湿度
         */
        Humidity: string;
    }
    /**
     * IO
     */
    interface DevConstant_IO {
        /**
         * di
         */
        di: string[];
        /**
         * do
         */
        do: string[];
    }

    /**
     * 设备定义常量
     */
    interface DevConstant extends DevConstant_Air, DevConstant_EM, DevConstant_TH, DevConstant_Ups, DevConstant_IO, id {
        /**
         * 备注
         */
        remark?: string
    }

    /**
     * 协议参数阀值
     */
    interface Threshold {
        /**
         * 参数名
         */
        name: string
        /**
         * 最小值
         */
        min: number
        /**
         * 最大值
         */
        max: number
    }

    /**
     * 协议参数告警状态
     */
    interface ConstantAlarmStat extends queryResultArgument {
        /**
         * 告警状态
         */
        alarmStat: string[]
    }

    /**
     * 协议操作指令
     */
    interface OprateInstruct {
        /**
         * 备注名
         */
        name: string
        /**
         * 指令值
         * @see 例子:060001%i,占位符%i是发送指令是设定的值,232协议默认不包含占位符
         */
        value: string
        /**
         * 系数
         */
        bl: string
        /**
         * 用户自定义值
         */
        val?: number
        /**
         * 指令说明
         */
        readme: string
        /**
         * 指令标签
         */
        tag: string
    }
    /**
     * 协议参数-常量参数阀值
     */
    interface ProtocolConstantThreshold {
        /**
         * 协议
         */
        Protocol: string,
        /**
         * 协议类型
         */
        ProtocolType: string,
        /**
         * 协议常量参数
         */
        Constant: DevConstant
        /**
         * 协议约束配置
         */
        Threshold: Threshold[]
        /**
         * 协议约束告警配置
         */
        AlarmStat: ConstantAlarmStat[]
        /**
         * 协议参数显示约束
         */
        ShowTag: string[]
        /**
         * 协议支持操作指令
         */
        OprateInstruct: OprateInstruct[]
    }
    /**
     * 别名
     */
    interface alias {
        name: string,
        alias: string
    }

    /**
     * 相同设备下的参数字段别名
     */
    interface DevArgumentAlias {
        mac: string,
        pid: number,
        protocol: string,
        alias: alias[]
    }

    /**
     * 用户自定义配置
     */
    interface userSetup {
        /**
         * 用户名
         */
        user: string
        /**
         * 告警联系手机号
         */
        tels: string[]
        /**
         * 告警联系邮箱
         */
        mails: string[]
        /**
         * 告警推送微信
         */
        wxs: string[]
        /**
         * 告警参数设置
         */
        ProtocolSetup: ProtocolConstantThreshold[]
        ProtocolSetupMap: Map<string, ProtocolConstantThreshold>
        ShowTagMap: Map<string, Set<string>>
        ThresholdMap: Map<string, Map<string, Threshold>>
        AlarmStateMap: Map<string, Map<string, ConstantAlarmStat>>
    }

    /**
     * 协议解析结果集
     */
    interface queryResultSave extends Record<string, any> {
        /**
         * mac
         */
        mac: string
        /**
         * 地址
         */
        pid: number
        /**
         * 时间戳
         */
        timeStamp: number
        /**
         * 设备数据
         */
        result: queryResultArgument[]
        /**
         * 查询间隔
         */
        Interval: number
        /**
         * 耗时
         */
        useTime: number
        /**
         * 
         */
        time: string
    }

    /**
     * 告警类型
     */
    type ConstantThresholdType = "Threshold" | "Constant" | "ShowTag" | "OprateInstruct" | "AlarmStat"

    /**
     * 操作指令查询对象
     */
    interface instructQueryArg extends queryResultArgument {
        DevMac: string
        pid: number,
        mountDev: string
        protocol: string
    }

    /**
     * 操作指令请求对象
     */
    interface instructQuery {
        /**
         * 协议
         */
        protocol: string
        /**
         * mac
         * 
         */
        DevMac: string
        /**
         * 设备地址
         */
        pid: number
        /**
         * 协议类型
         */
        type: number
        /**
         * 唯一事件字符串,用于接受返回事件
         */
        events: string
        /**
         * 指令
         */
        content: string
        /**
         * 查询结果
         */
        result?: Buffer
        /**
         * 查询间隔
         */
        Interval?: number
    }

    /**
     * 透传设备告警对象
     */
    interface uartAlarmObject {
        /**
         * 告警信息原始数据_id
         */
        parentId?: string
        /**
         * mac
         */
        mac: string
        /**
         * 设备名称
         */
        devName: string
        pid: number
        /**
         * 协议
         */
        protocol: string
        /**
         * 标签
         */
        tag: string
        /**
         * 时间戳
         */
        timeStamp: number
        /**
         * 消息
         */
        msg: string
        /**
         * 确认状态
         */
        isOk?: boolean
    }

    /**
     * 单条发送短信
     */
    type UartAlarmType = "透传设备下线提醒" | "透传设备上线提醒" | '透传设备告警'
    /**
     * 
     */
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

    /**
     * 站内信记录
     */
    interface logInnerMessages extends id {
        timeStamp: number;
        /**
         * 用户
         */
        user?: string;
        /**
         * 用户昵称
         */
        nikeName?: string;
        /**
         * 设备mac
         */
        mac?: string;
        /**
         * 设备pid
         */
        page?: number;

        /**
         * 数据
         */
        data?: Record<string, any>

        /**
         * 消息
         */
        message: string;

    }

    /**
     * LOG 日志
    // 短信发送
     */
    interface logSmsSend extends id {
        /**
         * 手机号
         */
        tels: string[]
        /**
         * 发送参数
         */
        sendParams: {
            /**
             * 
             */
            RegionId: string
            PhoneNumbers: string
            SignName: string
            TemplateCode: string
            TemplateParam: String
        },
        /**
         * 发送结果
         */
        Success?: {
            Message: string
            RequestId: string
            BizId: string
            Code: string
        },
        /**
         * 报错信息
         */
        Error?: any
    }

    /**
     * 邮件发送结果
     */
    interface mailResponse {
        /**
         * 邮箱s
         */
        accepted: string[]
        rejected: string[],
        envelopeTime: number
        messageTime: number
        messageSize: number
        response: string
        envelope: { from: string, to: string[] },
        messageId: string
    }

    /**
     * 邮件log
     */
    interface logMailSend extends id {
        /**
         * 邮箱s
         */
        mails: string[]
        /**
         * 发送参数
         */
        sendParams: {
            /**
             *发送人
             */
            from: string
            /**
             * 接受人
             */
            to: string
            /**
             * 主题
             */
            subject: string
            /**
             * 消息实体,html格式字符串
             */
            html: string
        }
        /**
         * 返回信息
         */
        Success?: mailResponse
        /**
         * 报错信息
         */
        Error?: any
    }

    /**
     * 操作请求
     */
    interface logUserRequst extends id {
        /**
         * 用户
         */
        user: string,
        /**
         * 用户组
         */
        userGroup: string,
        /**
         * api路径
         */
        type: string,
        /**
         * 参数
         */
        argument?: any
    }

    /**
     * 用户操作类型
     */
    type logLogins = "用户登陆" | '用户登出' | '用户注册' | "用户重置密码" | "用户修改信息"

    /**
     * 用户登陆登出请求log
     */
    interface logUserLogins extends id {
        /**
         * 用户
         */
        user: string,
        /**
         * 类型
         */
        type: logLogins,
        /**
         * 地址
         */
        address: string
        /**
         * 消息
         */
        msg: string
    }


    /**
     * 节点连接断开等事件
     */
    type logNodesType = "连接" | "断开" | "上线" | "重新上线" | "非法连接请求" | "TcpServer启动失败" | "告警" | "重新连接" | "节点断开" | "dtu主动断开" | "dtu断开"

    /**
     * 节点log
     */
    interface logNodes extends id {
        /**
         * socketid
         */
        ID: string
        /**
         * ip
         */
        IP: string
        /**
         * 节点名称
         */
        Name: string
        /**
         * 事件类型
         */
        type: logNodesType
    }

    /**
     * 终端连接
     */
    type logTerminalsType = "连接" | "断开" | "查询超时" | "查询恢复" | "操作设备" | "操作设备结果" | 'DTU操作' | "重新连接" | "节点断开" | "dtu主动断开" | "dtu断开"

    /**
     * 终端log
     */
    interface logTerminals extends id {
        /**
         * 节点ip
         */
        NodeIP: string
        /**
         * 节点名称
         */
        NodeName: string
        /**
         * mac
         */
        TerminalMac: string
        /**
         * 事件类型
         */
        type: logTerminalsType
        /**
         * 消息
         */
        msg?: string
        /**
         * 参数
         */
        query?: any
        /**
         * 结果
         */
        result?: any
        /**
         * 创建时间
         */
        createdAt?: Date
    }

    /**
     * 设备流量使用量
     */
    interface logTerminaluseBytes extends id {
        /**
         * mac
         */
        mac: string
        /**
         * 日期
         */
        date: string
        /**
         * 使用流量
         */
        useBytes: number
    }

    /**
     * 透传模块状态变更
     * 
     *      */
    interface logDtuBusy extends id {
        /**
         * mac
         */
        mac: string
        /**
         * 状态
         */
        stat: boolean
        /**
         * 
         */
        n: number
        /**
         * 时间戳
         */
        timeStamp: number
    }

    /**
     * 聚合设备
     */
    interface AggregationDev extends TerminalMountDevs {
        /**
         * 参数结果
         */
        result: queryResultArgument[] | undefined;
        /**
         * 设备
         */
        DevMac: string
        /**
         * 昵称
         */
        name: string
        /**
         * 状态
         */
        online: boolean
    }

    /**
     * 
     */
    interface AggregationDevParse {
        pid: number,
        DevMac: string,
        name: string,
        Type: string,
        mountDev: string,
        protocol: string,
        parse: { [x: string]: queryResultArgument }
    }

    /**
     * 用户挂载聚合设备
     */
    interface Aggregation {
        /**
         * 用户
         */
        user: string
        /**
         * id
         */
        id: string
        /**
         * 名称
         */
        name: string
        /**
         * 
         */
        aggregations: AggregationDev[]
        /**
         * 聚合设备包含的dtu
         */
        devs: AggregationDevParse[]
        /**
         * 备注
         */
        remark?: string
    }




    /**
     * 操作指令请求对象
     */
    interface DTUoprate {
        /**
         * mac
         */
        DevMac: string
        /**
         * 事件对象
         */
        events: string
        /**
         * 指令
         */
        content: string
        /**
         * 结果
         */
        result?: string
    }

    /**
     * agg聚合设备布局对象
     */
    interface AggregationLayoutNode {
        /**
         * 定位x
         */
        x: number
        /**
         * 定位y
         */
        y: number
        /**
         * id
         */
        id: string
        /**
         * 参数别名
         */
        name: string
        /**
         * 绑定参数
         */
        bind: {
            mac: string,
            pid: number,
            name: string
        }
        /**
         * 颜色
         */
        color: string
        /**
         * 参数结果
         */
        result?: queryResultArgument
    }

    /**
     * 用户布局设置
     */
    interface userLayout {
        /**
         * 用户
         */
        user: string,
        /**
         * 类型
         */
        type: string,
        /**
         * id
         */
        id: string,
        /**
         * 背景图片信息
         */
        bg: string,
        /**
         * 布局信息
         */
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
}
