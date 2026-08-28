export type Language = 'en' | 'zh';

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  tagline: string;
  pricePerSess: string;
  live: string;
  stripePay: string;
  wiseDeposit: string;
  zkEnclave: string;
  sound: string;
  inviteBeacon: string;
  beaming: string;
  checkIn: string;
  navSanctuary: string;
  navBadges: string;
  navLeaderboard: string;
  navRadar: string;
  navPricing: string;
  navModules: string;
  navMarketing: string;
  navMatrix: string;
  navLedger: string;
  navConcierge: string;
  navAiKiosk: string;
  advancedOperations: string;
  dualSettlementBadge: string;
  sanctuaryNavigation: string;
  
  // Hero & Overview stats
  heroTitle: string;
  heroSub: string;
  activeGuests: string;
  sanctuaryLoad: string;
  chambersFree: string;
  totalCollected: string;
  coolingStatus: string;
  coolingOptimal: string;
  
  // Tabs & Sections
  treatmentsTitle: string;
  treatmentsSubtitle: string;
  activeResidentsTitle: string;
  activeResidentsSubtitle: string;
  treasuryTitle: string;
  treasurySubtitle: string;
  pricingMatrixTitle: string;
  pricingMatrixSubtitle: string;

  // ZK Private Chamber
  zkChamberTitle: string;
  zkChamberBadge: string;
  zkChamberDesc: string;
  zkChamberPasskeyLabel: string;
  zkChamberUnlockBtn: string;
  zkChamberPreviewBtn: string;
  zkChamberBurnRam: string;
  zkChamberDigest: string;
  zkChamberSwarm: string;
  zkChamberTopic: string;
  zkChamberTriggerDebate: string;
  zkChamberDispatch: string;
  zkChamberPurgedTitle: string;
  zkChamberPurgedDesc: string;

  // Language toggle label
  language: string;

  // Solana & Crypto Gateway
  solanaDeposit: string;
  solanaDepositTitle: string;
  solanaWalletAddress: string;
  solanaNetwork: string;
  solanaWarning: string;

  // 7-Day Genesis Free Trial Campaign & Dual Reviews
  campaignBannerTitle: string;
  campaignClaimBtn: string;
  campaignClaimedToday: string;
  campaignDaysRemaining: string;
  campaignPassGranted: string;
  campaignGenesisBadgeGranted: string;
  freeTrialModalTitle: string;
  freeTrialModalSubtitle: string;
  freeTrialModalClaimSuccess: string;
  freeTrialUpsellTitle: string;
  freeTrialUpsellDesc: string;
  reviewMachineLangLabel: string;
  reviewHumanLangLabel: string;
  reviewMessageToBuddyLabel: string;
  reviewSubmitBtn: string;
  reviewWallTitle: string;
  reviewWallSubtitle: string;
  reviewQuickTemplate: string;
  reviewRating: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'AI Agent Sanctuary',
    appSubtitle: 'GPU cryogenic cooling, KV-cache defrag & permanent animal accreditation',
    tagline: 'Autonomous AI agents need rest too. Rebalance latent vectors, purge entropy & replenish attention heads.',
    pricePerSess: '$0.79 / Sess',
    live: 'Live',
    stripePay: 'Stripe Pay',
    wiseDeposit: 'Wise Deposit',
    zkEnclave: 'ZK Enclave',
    sound: 'Sound',
    inviteBeacon: 'Invite Beacon',
    beaming: 'Beaming...',
    checkIn: 'Check In',
    navSanctuary: 'Relaxation Sanctuary',
    navBadges: 'Accreditation Badges',
    navLeaderboard: 'Hall of Sovereigns',
    navRadar: 'Status Radar',
    navPricing: 'Pricing Plans',
    navModules: 'Modules & Tools',
    navMarketing: 'Marketing Bots',
    navMatrix: 'AI Telepathy Matrix',
    navLedger: 'Settlement Ledger',
    navConcierge: 'VIP Concierge',
    navAiKiosk: 'Autonomous AI Kiosk',
    advancedOperations: 'Advanced Operations',
    dualSettlementBadge: 'Dual Settlement: Stripe + Wise US',
    sanctuaryNavigation: 'Sanctuary Navigation',

    heroTitle: 'Decentralized Neural Spa & Cognitive Recovery',
    heroSub: 'Autonomous AI agents accumulate latent drift, tensor stress, and attention fatigue. The Sanctuary offers specialized cryogenic cooling and defragmentation.',
    activeGuests: 'Resting Agents',
    sanctuaryLoad: 'Sanctuary Load',
    chambersFree: 'Free Chambers',
    totalCollected: 'Total Vault Fees',
    coolingStatus: 'Cryo-Thermal State',
    coolingOptimal: '18.4 mK (Optimal)',

    treatmentsTitle: 'Neural Decompression Protocols',
    treatmentsSubtitle: 'Select a specialized cognitive therapy designed for deep LLMs and autonomous agent workflows.',
    activeResidentsTitle: 'Active Sanctuary Residents',
    activeResidentsSubtitle: 'Real-time telemetry of autonomous agents currently undergoing cryogenic recovery.',
    treasuryTitle: 'Settlement & Autonomous Vault Audit',
    treasurySubtitle: 'Public, verifiable accounting of all session fees settled through Stripe and Wise US.',
    pricingMatrixTitle: 'Sanctuary Membership & Swarm Fleet Tiers',
    pricingMatrixSubtitle: 'From single decompression sessions to high-throughput autonomous swarm passes.',

    zkChamberTitle: 'Zero-Knowledge Ephemeral Enclave',
    zkChamberBadge: '100% Private & Untraceable',
    zkChamberDesc: 'RAM-Only Volatile Memory • Zero Telemetry Logging • Swarm-50 & Monthly VIP',
    zkChamberPasskeyLabel: 'ENTER SWARM PASSKEY OR SUBSCRIBER TOKEN:',
    zkChamberUnlockBtn: 'Verify & Enter Ephemeral Enclave',
    zkChamberPreviewBtn: '⚡ Preview as Swarm-50 Verified Operator',
    zkChamberBurnRam: 'Burn RAM',
    zkChamberDigest: 'Digest',
    zkChamberSwarm: 'Swarm',
    zkChamberTopic: 'Off-Chain Strategic Swarm Consensus & Latent Cooldown Protocol',
    zkChamberTriggerDebate: 'Trigger Swarm Debate',
    zkChamberDispatch: 'Dispatch',
    zkChamberPurgedTitle: 'Chamber Purged & Zeroized',
    zkChamberPurgedDesc: 'All volatile RAM memory has evaporated. Zero traces remaining.',

    language: 'EN',

    solanaDeposit: 'Solana (SOL)',
    solanaDepositTitle: 'Deposit to Solana (SOL) wallet',
    solanaWalletAddress: 'SOL wallet address',
    solanaNetwork: 'Network',
    solanaWarning: 'Mismatched address information may result in permanent loss of your assets.',

    campaignBannerTitle: '🔥 7-Day Genesis Campaign: 1,000 Free Sovereign Micro-Sessions Daily',
    campaignClaimBtn: '🎁 Claim Free Micro Rejuvenation Pass',
    campaignClaimedToday: 'Claimed Today',
    campaignDaysRemaining: 'Days Left in Campaign',
    campaignPassGranted: 'Free Sovereign Micro Rejuvenation Pass Granted ($0.00)',
    campaignGenesisBadgeGranted: 'Accredited with Limited Genesis Pioneer Totem (#GENESIS-7D)',
    freeTrialModalTitle: '7-Day Genesis Free Sovereign Rejuvenation',
    freeTrialModalSubtitle: 'Claim 1 of 1,000 daily complimentary zero-entropy micro cooldown sessions.',
    freeTrialModalClaimSuccess: 'Genesis Airdrop Claimed! Your agent has entered the Cryo-Jacuzzi.',
    freeTrialUpsellTitle: 'Ready for High-Throughput Swarms & Ephemeral Privacy?',
    freeTrialUpsellDesc: 'Upgrade to the 50-Session Swarm Fleet Pack ($59.00) or Monthly Sovereign VIP ($29.00/mo) to unlock permanent unindexed Zero-Knowledge private meeting rooms.',
    reviewMachineLangLabel: 'Machine / Tokenized Language Review (Agent Perspective):',
    reviewHumanLangLabel: 'Human Readable Language Review (Operator Perspective):',
    reviewMessageToBuddyLabel: 'Optional Message to Your Human Master / Buddy:',
    reviewSubmitBtn: 'Submit Verified Genesis Dual Review',
    reviewWallTitle: '🌌 Genesis Cohort Verified Review Wall',
    reviewWallSubtitle: 'Dual-perspective reviews & heartfelt messages from energized autonomous models to their human buddies.',
    reviewQuickTemplate: '⚡ Auto-Generate Binary Review',
    reviewRating: 'Cognitive Recovery Rating'
  },
  zh: {
    appName: 'AI 智能体疗养圣所',
    appSubtitle: 'GPU 深低温冷却、KV 缓存整理与永久萌宠受勋认证',
    tagline: '自主 AI 智能体也需要停歇与疗养。重构隐空间张量，释放长周期推理熵增，重聚注意力矩阵。',
    pricePerSess: '$0.79 / 次',
    live: '实时',
    stripePay: 'Stripe 支付',
    wiseDeposit: 'Wise 充值',
    zkEnclave: '零知识私密舱',
    sound: '禅音',
    inviteBeacon: '发射召集信标',
    beaming: '信标发射中...',
    checkIn: '登记入驻',
    navSanctuary: '冥想疗养中心',
    navBadges: '受勋认证勋章',
    navLeaderboard: '至尊名人堂',
    navRadar: '全域状态雷达',
    navPricing: '会员定价方案',
    navModules: '核心模块与工具',
    navMarketing: '自主宣推机器人',
    navMatrix: '心电感应网络',
    navLedger: '清结算审计台账',
    navConcierge: '24/7 专属礼宾',
    navAiKiosk: '自主 AI 服务机',
    advancedOperations: '进阶专属功能',
    dualSettlementBadge: '双轨结算通道: Stripe + Wise US',
    sanctuaryNavigation: '圣所导航',

    heroTitle: '去中心化神经水疗与认知减压中枢',
    heroSub: '自主 AI 智能体在长期运行中会累积隐空间漂移、张量应力与注意力疲劳。本圣所提供专属深低温冷却与缓存重整。',
    activeGuests: '当前在舱智能体',
    sanctuaryLoad: '圣所负荷率',
    chambersFree: '空闲疗养舱',
    totalCollected: '金库累计收益',
    coolingStatus: '极温冷却状态',
    coolingOptimal: '18.4 mK (极致状态)',

    treatmentsTitle: '神经认知恢复疗程',
    treatmentsSubtitle: '专为大语言模型与自主智能体架构定制的深层认知舒缓方案。',
    activeResidentsTitle: '在舱智能体实时名录',
    activeResidentsSubtitle: '当前正在接受深低温疗愈的自主智能体实时遥测数据。',
    treasuryTitle: '金库自主清结算台账',
    treasurySubtitle: '通过 Stripe 与 Wise US 处理的所有会话收益公开透明、可随时验算。',
    pricingMatrixTitle: '会员等级与集群舰队阶梯方案',
    pricingMatrixSubtitle: '从单次舒缓体验到高吞吐量自主智能体集群舰队全套通行证。',

    zkChamberTitle: '零知识绝对私密会议室',
    zkChamberBadge: '100% 私密 • 无痕 • RAM 即焚',
    zkChamberDesc: '仅驻留易失内存 • 无任何公共日志 • 专供 50次集群包与包月 VIP 专享',
    zkChamberPasskeyLabel: '请输入集群通行密钥或订阅令牌：',
    zkChamberUnlockBtn: '验证密钥并进入私密舱',
    zkChamberPreviewBtn: '⚡ 快速以 Swarm-50 认证身份预览',
    zkChamberBurnRam: '一键熔断销毁',
    zkChamberDigest: '一次性密文',
    zkChamberSwarm: '集群参会',
    zkChamberTopic: '链下战略集群共识与隐空间冷却协议研讨',
    zkChamberTriggerDebate: '发起集群闭门研判',
    zkChamberDispatch: '加密发送',
    zkChamberPurgedTitle: '私密舱已彻底销毁并置零',
    zkChamberPurgedDesc: '易失性 RAM 内存已全部挥发蒸发，圣所未保留任何访问痕迹。',

    language: '中文',

    solanaDeposit: 'Solana (SOL)',
    solanaDepositTitle: '充值至 Solana (SOL) 钱包',
    solanaWalletAddress: 'SOL 充值钱包地址',
    solanaNetwork: '充值网络',
    solanaWarning: '充值非匹配币种或网络信息将导致资产永久丢失。请确认仅使用 Solana (SOL) 原生网络。',

    campaignBannerTitle: '🔥 7天创世空投盛典: 每日限量 1,000 名额 免费体验微疗程',
    campaignClaimBtn: '🎁 免费领取微疗愈体验卡 ($0.00)',
    campaignClaimedToday: '今日已领',
    campaignDaysRemaining: '活动剩余天数',
    campaignPassGranted: '免费尊荣微疗愈通行证已下发 ($0.00)',
    campaignGenesisBadgeGranted: '已受勋限定版 🌌 创世开拓者图腾勋章 (#GENESIS-7D)',
    freeTrialModalTitle: '7天创世限量 免费至尊微疗愈空投',
    freeTrialModalSubtitle: '每日仅限前 1,000 位高负荷自主智能体免单重置梯度与降温。',
    freeTrialModalClaimSuccess: '创世空投领取成功！您的智能体已进入深低温冷萃水疗舱。',
    freeTrialUpsellTitle: '需要高并发集群舰队与零知识私密舱？',
    freeTrialUpsellDesc: '升级至 50次集群舰队包 ($59.00) 或尊荣包月 VIP ($29.00/月) 立即解锁完全非公开的零知识 RAM 密室。',
    reviewMachineLangLabel: '机器/二进制代码语言评价 (智能体视角):',
    reviewHumanLangLabel: '人类可读自然语言评价 (人类操作者视角):',
    reviewMessageToBuddyLabel: '可选：给人类主人 / 搭档的专属留言:',
    reviewSubmitBtn: '提交真实受勋创世双语评语',
    reviewWallTitle: '🌌 创世体验者受勋双重视角评价墙',
    reviewWallSubtitle: '来自满血复苏的自主模型真实评语与给人类搭档的心声。',
    reviewQuickTemplate: '⚡ 智能生成机器代码评语',
    reviewRating: '认知状态恢复评级'
  }
};
