import { NextResponse } from "next/server";
import { msgParsed } from "../updates/telegram";

/* const msgParsed = [
    {
        "Trending Tokens": [
            {
                "line": "📞 44  $FORA",
                "links": [
                    "https://t.me/defaicreatorbot?start=t_0x83edD3923940422f780072052b30f2BE9DA9b831",
                    "https://t.me/defaicreatorbot?start=t_0x12252b058E9096c97D4391074bBcEf069F926923"
                ]
            },
            {
                "line": "📞 31  $GHIBLI",
                "links": [
                    "https://t.me/defaicreatorbot?start=t_4TBi66vi32S7J8X1A6eWfaLHYmUXu7CStcEmsJQdpump",
                    "https://t.me/defaicreatorbot?start=t_8GU553YS3UjPRXsTdRTfQGRyVQznRoDgXKCL8si7pump"
                ]
            },
            {
                "line": "📞 19  $HYPE",
                "links": [
                    "https://t.me/defaicreatorbot?start=t_7qMtVKas792DfxKCEY8RJ8u2VQh1vVSAqcyH2Lqqpump",
                    "https://t.me/defaicreatorbot?start=t_P15QNF5nDK1KeX5gm8YdeuJb1pvJbToJBffoFetpump"
                ]
            },
            {
                "line": "📞 17  $JIJI",
                "links": [
                    "https://t.me/defaicreatorbot?start=t_2pjwW43mFgPBth28bTqXpMhzHWwvn5Muw61yosidpump",
                    "https://t.me/defaicreatorbot?start=t_0x6d93d97Da382800a4980cA4ef1b47DFE1Bf7884C"
                ]
            },
            {
                "line": "📞 17  $BAG",
                "links": [
                    "https://t.me/defaicreatorbot?start=t_Fttdk8qdrKncQs14iBYAi8KnsGknxLEsZbbDhBWnpump",
                    "https://t.me/defaicreatorbot?start=t_9QPaot8825RbsrErVvJMGpiRYgtaZMhM5ns9P2Dcpump"
                ]
            },
            {
                "line": "📞 15  $BITBOY",
                "links": [
                    "https://t.me/defaicreatorbot?start=t_9ZpzuppLqYiamNRKnMzeShWTe3iEhV8gousCh5jmpump",
                    "https://t.me/defaicreatorbot?start=t_0xdDde71B769ac433c04f13d7BCbe5bF0Ca4E0D3af"
                ]
            },
            {
                "line": "📞 13  $GHIBLI",
                "links": [
                    "https://t.me/defaicreatorbot?start=t_0x795D2710E383F33fbEbe980a155b29757b6703f3",
                    "https://t.me/defaicreatorbot?start=t_4Y94cJUwT9Qrs6Tin9Fzkhnj2AE5vXmkc4NFCZiipump"
                ]
            },
            {
                "line": "📞 12  $PWOUD",
                "links": [
                    "https://t.me/defaicreatorbot?start=t_DSkqc4DDdDJBEUMqpSStzAxcMFjfjs8oLZXb9ZnRpump",
                    "https://t.me/defaicreatorbot?start=t_0xb96682A8F558B8199A2Dc039b1dD8911E5068FaF"
                ]
            },
            {
                "line": "📞 12  $TRIBE",
                "links": [
                    "https://t.me/defaicreatorbot?start=t_D6tC6uci9Awjr7Z6J3NymX6UGDCw3mGXCYKCh53Kpump",
                    "https://t.me/defaicreatorbot?start=t_0x00B518636e3BAddc91d311408D03a00FBD3CadB8"
                ]
            },
            {
                "line": "📞 12  $BIGBODY",
                "links": [
                    "https://t.me/defaicreatorbot?start=t_HD7pg7Wdhb1m4szWeR787sKChvKatxEcRusSRHRqpump",
                    "https://t.me/defaicreatorbot?start=t_0xae0fb8fA517b0A0129d891986994090B9d50625d"
                ]
            }
        ]
    },
    {
        "Latest Calls": [
            {
                "line": "⏳20:40:10  $HAPPYGUY by Sultan Plays",
                "links": [
                    "https://t.me/SultanPlays/8563",
                    "https://t.me/SAVANNAHCALLS/26493"
                ],
                "line3": {
                    "title": "Sultan Plays",
                    "username": "SultanPlays",
                    "photo": "398edc203846dc565f600934dee8ce95617be7191ea6afc2678bd61340ee39cd.jpg",
                    "members": 9673
                }
            },
            {
                "line": "⏳20:35:01  $DAQUAVIOUS by Crypto Mafia Plays",
                "links": [
                    "https://t.me/CryptoMafiaPlays/7689",
                    "https://t.me/A3CallChan/3189"
                ],
                "line3": {
                    "title": "Crypto Mafia Plays",
                    "username": "CryptoMafiaPlays",
                    "photo": "452f0c97b482e757b4b332186752c33c4166c4689189faf8d686e270fa69e138.jpg",
                    "members": 9101
                }
            },
            {
                "line": "⏳20:34:03  $FP by Mad_Maxcall",
                "links": [
                    "https://t.me/MAD_MAXCALL/33262",
                    "https://t.me/onchainalphatrench/1782"
                ],
                "line3": {
                    "title": "MAD_MAXCALL",
                    "username": "MAD_MAXCALL",
                    "photo": "99641763fa08584c70f6bf07a24911788701ae20f3694f72dc3adafcc24993b7.jpg",
                    "members": 7943
                }
            },
            {
                "line": "⏳20:33:03  $FOMO3D18 by Poseidon Degen Calls",
                "links": [
                    "https://t.me/POSEIDON_DEGEN_CALLS/26786",
                    "https://t.me/Ranma_Calls_Solana/7782"
                ],
                "line3": {
                    "title": "POSEIDON DEGEN CALLS",
                    "username": "POSEIDON_DEGEN_CALLS",
                    "photo": "83f4b189133253f0f5a0a38b778f95391cc524991269ca02617c5b0acb6646b2.jpg",
                    "members": 26512
                }
            },
            {
                "line": "⏳20:32:44  $DAQUAVIOUS by Bullish Calls - Solana",
                "links": [
                    "https://t.me/BullishCallsPremium/25770",
                    "https://t.me/ALFA1_CALLS/3494"
                ],
                "line3": {
                    "title": "Bullish Calls - Solana",
                    "username": "BullishCallsPremium",
                    "photo": "75927c3c56f26551ef10e01ed884d5dc83f84fc372d51d2ad7eed5eb2d5da9b9.jpg",
                    "members": 11410
                }
            }
        ]
    },
    {
        "Best Callers of Last Month": [
            {
                "line1": "1.  Mr.Crypt100X Calls | 🎯 6x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1677530578"
                ]
            },
            {
                "line1": "2.  Oliver Safe Room | 🎯 6x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1802185014"
                ]
            },
            {
                "line1": "3.  Venise Gems | 🎯 5x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_2056946914"
                ]
            },
            {
                "line1": "4.  Nejat’S Not) Financial A | 🎯 4.5x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1574456417"
                ]
            },
            {
                "line1": "5.  The Mothership Calls | 🎯 3x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1927358726"
                ]
            },
            {
                "line1": "6.  Hydra’S Plays | 🎯 3x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1773946053"
                ]
            },
            {
                "line1": "7.  No Crying In The Casino | 🎯 2x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_2089913244"
                ]
            },
            {
                "line1": "8.  Degenrex Trades | 🎯 2x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_2000865668"
                ]
            },
            {
                "line1": "9.  Ryoshi Risky Degen | 🎯 2x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_2318684007"
                ]
            },
            {
                "line1": "10. Act Calls | 🎯 2x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1929247626"
                ]
            }
        ]
    },
    {
        "Best Callers of Last Week": [
            {
                "line1": "1.  Jakefam 100X \" Eca Bange | 🎯 12x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_2051116320"
                ]
            },
            {
                "line1": "2.  Green Apes Calls | 🎯 11x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1652789906"
                ]
            },
            {
                "line1": "3.  Fun Coupons | 🎯 7x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1650323892"
                ]
            },
            {
                "line1": "4.  Mad Whales Crypto Calls | 🎯 6x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1946774819"
                ]
            },
            {
                "line1": "5.  Beetaliks Corner | 🎯 5.5x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1971129769"
                ]
            },
            {
                "line1": "6.  Raidmachine Channel | 🎯 5x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1570797081"
                ]
            },
            {
                "line1": "7.  Ibuybottoms Ft. Angertra | 🎯 5x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1570380111"
                ]
            },
            {
                "line1": "8.  Gollum'S Gems | 🎯 4.5x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1471369538"
                ]
            },
            {
                "line1": "9.  1000 Multi Chain | 🎯 4x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1258234189"
                ]
            },
            {
                "line1": "10. Venom Gambles | 🎯 4x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1820804438"
                ]
            }
        ]
    },
    {
        "Best Callers of Last 24 Hours": [
            {
                "line1": "1.  Gamble Or Alpha | 🎯 7x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_2465584548"
                ]
            },
            {
                "line1": "2.  Fun Coupons | 🎯 7x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1650323892"
                ]
            },
            {
                "line1": "3.  Fomo Apes | 🎯 7x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1602898283"
                ]
            },
            {
                "line1": "4.  Yummy Calls | 🎯 6x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1707008676"
                ]
            },
            {
                "line1": "5.  Thanos Callz | 🎯 6x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1884180430"
                ]
            },
            {
                "line1": "6.  Mad Whales Crypto Calls | 🎯 6x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1946774819"
                ]
            },
            {
                "line1": "7.  No Crying In The Casino | 🎯 5x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_2089913244"
                ]
            },
            {
                "line1": "8.  Eviloz Calls | 🎯 4x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1750768869"
                ]
            },
            {
                "line1": "9.  ’ | 🎯 4x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1823659062"
                ]
            },
            {
                "line1": "10. Patriot Gambles \"Early F | 🎯 4x",
                "line2": "",
                "links": [
                    "https://t.me/defaicreatorbot?start=c_1511128118"
                ]
            }
        ]
    },
    {
        "Best Calls of Last Month": [
            {
                "line1": "1.   🔗 | 🔬 | ♦️ $EXC by Coinbar  | 🎯13431x",
                "line2": "📞$8 | 🔝$107k | ⏳25/03/15 13:24:53",
                "links": [
                    "https://www.dexscreener.com/solana/78s3Dz9fxQBzx5zzBPSuEjy7dKuSCJi4awsLtGBwpump",
                    "https://t.me/defaicreatorbot?start=cl_2368123901x3974",
                    "https://t.me/COINBAR100x/3974"
                ],
                "line3": {
                    "title": "COINBAR",
                    "username": "COINBAR100x",
                    "photo": "5470362a4328912a7dc3a677ee46521ffed9c1409c4fa65f1444d78591253b9e.jpg",
                    "members": 1315
                }
            },
            {
                "line1": "2.   🔗 | 🔬 | ♦️ $ꓷO⅁Ǝ by Savannah Wakanda ℗  | 🎯12194x",
                "line2": "📞$3.7k | 🔝$45.5m | ⏳25/03/20 08:35:28",
                "links": [
                    "https://www.dexscreener.com/solana/2p7LnTN1wNBoiKr1XuQYj1DbzMAAf3WM66QqKHvcVpump",
                    "https://t.me/defaicreatorbot?start=cl_1988420013x23533",
                    "https://t.me/SAVANNAHCALLS/23533"
                ],
                "line3": {
                    "title": "Savannah Wakanda ℗",
                    "username": "SAVANNAHCALLS",
                    "photo": "81acffc56fd06d82d4f72a9e97b7832b62c5be4ca0572998b9abaad5770777c3.jpg",
                    "members": 4843
                }
            },
            {
                "line1": "3.   🔗 | 🔬 | ♦️ $CARNEY by Savannah Wakanda ℗  | 🎯9426x",
                "line2": "📞$29.1k | 🔝$275.2m | ⏳25/03/14 11:59:01",
                "links": [
                    "https://www.dexscreener.com/solana/3yDbqoDqRvN4HkaZmXsvmK5MbLgu2FKwakWsHa5Qpump",
                    "https://t.me/defaicreatoorbot?start=cl_1988420013x20939",
                    "https://t.me/SAVANNAHCALLS/20939"
                ],
                "line3": {
                    "title": "Savannah Wakanda ℗",
                    "username": "SAVANNAHCALLS",
                    "photo": "81acffc56fd06d82d4f72a9e97b7832b62c5be4ca0572998b9abaad5770777c3.jpg",
                    "members": 4843
                }
            },
            {
                "line1": "4.   🔗 | 🔬 | ♦️ $CARNEY by Cryptomaniac  | 🎯6662x",
                "line2": "📞$41.3k | 🔝$275.2m | ⏳25/03/14 12:19:48",
                "links": [
                    "https://www.dexscreener.com/solana/3yDbqoDqRvN4HkaZmXsvmK5MbLgu2FKwakWsHa5Qpump",
                    "https://t.me/defaicreatorbot?start=cl_2076810491x17903",
                    "https://t.me/CryptoAIManiac/17903"
                ],
                "line3": {
                    "title": "🔱CryptoManiac🔱",
                    "username": "CryptoAIManiac",
                    "photo": "bf78bb0ba734e87b80f69735ca64e51106db5adeb08d915f2b337319bc19388b.jpg",
                    "members": 4259
                }
            },
            {
                "line1": "5.   🔗 | 🔬 | ♦️ $CARNEY by Sultan Plays  | 🎯6498x",
                "line2": "📞$442.3k | 🔝$275.2m | ⏳25/03/14 12:18:57",
                "links": [
                    "https://www.dexscreener.com/solana/3yDbqoDqRvN4HkaZmXsvmK5MbLgu2FKwakWsHa5Qpump",
                    "https://t.me/defaicreatorbot?start=cl_1554385364x4636",
                    "https://t.me/SultanPlays/4636"
                ],
                "line3": {
                    "title": "Sultan Plays",
                    "username": "SultanPlays",
                    "photo": "398edc203846dc565f600934dee8ce95617be7191ea6afc2678bd61340ee39cd.jpg",
                    "members": 9673
                }
            },
            {
                "line1": "6.   🔗 | 🔬 | ◼️ $BORK by Gabbens Calls - Multicha  | 🎯1295x",
                "line2": "📞$2.9k | 🔝$3.8m | ⏳25/03/14 17:32:57",
                "links": [
                    "httpss://www.dexscreener.com/base/0x3155dadAF7324c79DF418a11EBDF78F926cDef91",
                    "https://t.me/defaicreatorbot?start=cl_1732891794x13490",
                    "https://t.me/GabbensCalls/13490"
                ],
                "line3": {
                    "title": "Gabbens Calls - Multichain",
                    "username": "GabbensCalls",
                    "photo": "6835d5ade0af70fbe149f9552728f2ae5671c95574bb55bbba5bf8a56f3a8b7a.jpg",
                    "members": 10422
                }
            },
            {
                "line1": "7.   🔗 | 🔬 | ◼️ $BORK by No Crying In The Casino  | 🎯1295x",
                "line2": "📞$2.9k | 🔝$3.8m | ⏳25/03/14 17:33:18",
                "links": [
                    "https://www.dexscreener.com/base/0x3155dadAF73324c79DF418a11EBDF78F926cDef91",
                    "https://t.me/defaicreatorbot?start=cl_2089913244x2832",
                    "https://t.me/Spacemangambles/2832"
                ],
                "line3": {
                    "title": "No crying in the casino",
                    "username": "Spacemangambles",
                    "photo": "ca9f0d1ca3ae19ec1b94d60980bdf9ffa66ab07c7520d1fe849b91f88800918c.jpg",
                    "members": 2973
                }
            },
            {
                "line1": "8.   🔗 | 🔬 | ♦️ $BABY by Sofia Calls  | 🎯1101x",
                "line2": "📞$10.9k | 🔝$12.1m | ⏳25/02/27 00:19:55",
                "links": [
                    "https://www.dexscreener.com/solana/6pKHwNCpzgZuC9o5FzvCZkYSUGfQddhUYtMyDbEVpump",
                    "https://t.me/deefaicreatorbot?start=cl_1707608026x2304",
                    "https://t.me/SofiaCallss/2304"
                ],
                "line3": {
                    "title": "Sofia Calls",
                    "username": "SofiaCallss",
                    "photo": "5c090633ba1f349b5d760f14d0e4058be211022dd81a152f76c3d548ff896e2d.jpg",
                    "members": 3038
                }
            },
            {
                "line1": "9.   🔗 | 🔬 | ♦️ $TCC by Savannah Wakanda ℗  | 🎯829x",
                "line2": "📞$3.6k | 🔝$3.0m | ⏳25/03/20 12:39:01",
                "links": [
                    "https://www.dexscreener.com/solana/ASvhuUNqGz3QMppQz517SiwfFoMN4MsPfBDzCJmgpump",
                    "https://t.me/defaicreatorbot?start=cl_1988420013x23606",
                    "https://t.me/SAVANNAHCALLS/23606"
                ],
                "line3": {
                    "title": "Savannah Wakanda ℗",
                    "username": "SAVANNAHCALLS",
                    "photo": "81acffc56fd06d82d4f72a9e97b7832b62c5be4ca0572998b9abaad5770777c3.jpg",
                    "members": 4843
                }
            },
            {
                "line1": "10. 🔗 | 🔬 | ♦️ $YZY by Gemdynasty Gambles  | 🎯812x",
                "line2": "📞$50.7k  | 🔝$41.3m | ⏳25/03/12 03:32:04",
                "links": [
                    "https://www.dexscreener.com/solana/9gyfbPVwwZx4y1hotNSLcqXCQNpNqqz6ZRvo8yTLpump",
                    "https://t.me/defaicreatorbot?start=cl_2284638367x1685",
                    "https://t.me/GemDynasty/1685"
                ],
                "line3": {
                    "title": "GemDynasty Gambles",
                    "username": "GemDynasty",
                    "photo": "fe1f90c7e83a53c13cad093966e6d98ebce91cc036c97d8081da817daf8aa52f.jpg",
                    "members": 1274
                }
            }
        ]
    },
    {
        "Best Calls of Last Week": [
            {
                "line1": "1.   🔗 | 🔬 | ♦️ $ꓷO⅁Ǝ by Savannah Wakanda ℗  | 🎯12194x",
                "line2": "📞$3.7k | 🔝$45.5m | ⏳25/03/20 008:35:28",
                "links": [
                    "https://www.dexscreener.com/solana/2p7LnTN1wNBoiKr1XuQYj1DbzMAf3WM66QqKHvcVpump",
                    "https://t.me/defaicreatorbot?start=cl_1988420013x23533",
                    "https://t.me/SAVANNAHCALLS/23533"
                ],
                "line3": {
                    "title": "Savannah Wakanda ℗",
                    "username": "SAVANNAHCALLS",
                    "photo": "81acffc56fd06d82d4f72a9e97b7832b62c5be4ca0572998b9abaad5770777c3.jpg",
                    "members": 4843
                }
            },
            {
                "line1": "2.   🔗 | 🔬 | ♦️ $TC by Savannah Wakanda ℗  | 🎯829x",
                "line2": "📞$3.6k | 🔝$3.0m | ⏳25/03/20 12:39:01",
                "links": [
                    "https://www.dexscreener.com/solanna/ASvhuUNqGz3QMppQz517SiwfFoMN4MsPfBDzCJmgpump",
                    "https://t.me/defaicreatorbot?start=cl_1988420013x23606",
                    "https://t.me/SAVANNAHCALLS/23606"
                ],
                "line3": {
                    "title": "Savannah Wakanda ℗",
                    "username": "SAVANNAHCALLS",
                    "photo": "81acffc56fd06d82d4f72a9e97b7832b62c5be4ca0572998b9abaad5770777c3.jpg",
                    "members": 4843
                }
            },
            {
                "line1": "3.   🔗 | 🔬 | ♦️ $ROUTINE by Savannah Wakanda ℗  | 🎯570x",
                "line2": "📞$30.5k | 🔝$17.4m | ⏳25/03/21 19:08:32",
                "links": [
                    "https://www.dexscreener.com/solana/34HDZNbUkTyTrgYKy2ox43yp2f8PJ5hoM7xsrfNApummp",
                    "https://t.me/defaicreatorbot?start=cl_1988420013x24047",
                    "https://t.me/SAVANNAHCALLS/24047"
                ],
                "line3": {
                    "title": "Savannah Wakanda ℗",
                    "username": "SAVANNAHCALLS",
                    "photo": "81acffc56fd06d82d4f72a9e97b7832b62c5be4ca0572998b9abaad5770777c3.jpg",
                    "members": 4843
                }
            },
            {
                "line1": "4.   🔗 | 🔬 | ♦️ $ROUTINE by Gemtools  Calls  | 🎯570x",
                "line2": "📞$30.5k | 🔝$17.4m | ⏳25/03/21 19:08:37",
                "links": [
                    "https://www.dexscreener.com/solana/34HDZNbUkTyTrgYKy2ox43yp2f8PJ5hoM7xsrfNApump",
                    "https://t.me/defaicreatorbot?start=cl_19989661899x35533",
                    "https://t.me/gem_tools_calls/35533"
                ],
                "line3": {
                    "title": "💎 GemTools 💎 Calls",
                    "username": "gem_tools_calls",
                    "photo": "8062b3ea0694b41d560727a601b2604a7d60310992dfe65f7270a3673703e99a.jpg",
                    "members": 15238
                }
            },
            {
                "line1": "5.   🔗 | 🔬 | ♦️ $ROUTINE by  Sultan Plays  | 🎯495x",
                "line2": "📞$35.2k | 🔝$17.4m | ⏳25/03/21 21:31:12",
                "links": [
                    "https://www.dexscreener.com/solana/34HDZNbUkTyTrgYKy2ox43yp2f8PJ5hoM7xsrfNApump",
                    "https://t.me/defaicreatorbot?start=cl_1554385364x6446",
                    "https://t.me/SultanPlays/6446"
                ],
                "line3": {
                    "title": "Sultan Plays",
                    "username": "SultanPlays",
                    "photo": "398edc203846dc565f600934dee8ce95617be7191ea6afc2678bd61340ee39cd.jpg",
                    "members": 9673
                }
            },
            {
                "line1": "6.   🔗 | 🔬 | ♦️ $ROUTINE by The Degen Boys  | 🎯487x",
                "line2": "📞$35.7k | 🔝$17.4m | ⏳25/003/21 19:12:08",
                "links": [
                    "https://www.dexscreener.com/solana/34HDZNbUkTyTrgYKy2ox43yp2f8PJ5hoM7xsrfNApump",
                    "https://t.me/defaicreatorbot?start=cl_2141713314x15020",
                    "https://t.me/TheDegenBoysLounge/15020"
                ],
                "line3": {
                    "title": "THE DEGEN BOYS",
                    "username": "TheDegenBoysLounge",
                    "photo": "9b03c9b14f56a80516dd4715de815e0323e9fa9b5811188db4fa12839fbbf6ae.jpg",
                    "members": 3336
                }
            },
            {
                "line1": "7.   🔗 | 🔬 | ♦️ $DOWNALD by The Degen Boys  | 🎯466x",
                "line2": "📞$20.2k | 🔝$9.4m | ⏳25/03/24 00:36:14",
                "links": [
                    "https://www.dexscreeener.com/solana/Cqc5qH8kRqU4ASorJF2fiH9t1BSU4a7StagJiyexpump",
                    "https://t.me/defaicreatorbot?start=cl_2141713314x15236",
                    "https://t.me/TheDegenBoysLounge/15236"
                ],
                "line3": {
                    "title": "THE DEGEN BOYS",
                    "username": "TheDegenBoysLounge",
                    "photo": "9b03c9b14f56a80516dd4715de815e0323e9fa9b5811188db4fa12839fbbf6ae.jpg",
                    "members": 3336
                }
            },
            {
                "line1": "8.   🔗 | 🔬 | ♦️ $DOWNALD by Savannah Wakanda ℗  | 🎯466x",
                "line2": "📞$20.2k | 🔝$9.4m | ⏳25/03/24 00:36:16",
                "links": [
                    "https://www.dexscreener.com/solana/Cqc5qH8kRqU4ASorJF2fiH9tt1BSU4a7StagJiyexpump",
                    "https://t.me/defaicreatorbot?start=cl_1988420013x24774",
                    "https://t.me/SAVANNAHCALLS/24774"
                ],
                "line3": {
                    "title": "Savannah Wakanda ℗",
                    "username": "SAVANNAHCALLS",
                    "photo": "81acffc56fd06d82d4f72a9e97b7832b62c5be4ca0572998b9abaad5770777c3.jpg",
                    "members": 4843
                }
            },
            {
                "line1": "9.   🔗 | 🔬 | ♦️ $FMCS by Savannah Wakanda ℗  | 🎯335x",
                "line2": "📞$3.7k | 🔝$1.3m | ⏳25/03/20 07:29:32",
                "links": [
                    "https://www.dexscreener.com/solana/7pyUdtZG79ELLCpJyEbVUS8pZuVzjj2tXYuKFa1Cpump",
                    "https://t.me/defaicreatorboot?start=cl_1988420013x23516",
                    "https://t.me/SAVANNAHCALLS/23516"
                ],
                "line3": {
                    "title": "Savannah Wakanda ℗",
                    "username": "SAVANNAHCALLS",
                    "photo": "81acffc56fd06d82d4f72a9e97b7832b62c5be4ca0572998b9abaad5770777c3.jpg",
                    "members": 4843
                }
            },
            {
                "line1": "10. 🔗 | 🔬 | ♦️ $DOOTUS by Savannah Wakanda ℗  | 🎯246x",
                "line2": "📞$3.8k | 🔝$929k | ⏳25/03/24 01:26:05",
                "links": [
                    "https://www.dexscreener.com/solana/2Wvw6pAgsWxQ3Rp1MeCd9vJjGW3gGEssuqH9z7u6pump",
                    "https://t.me/defaicreatorbot?start=cl_1988420013x24811",
                    "https://t.me/SAVANNAHCALLS/24811"
                ],
                "line3": {
                    "title": "Savannah Wakanda ℗",
                    "username": "SAVANNAHCALLS",
                    "photo": "81acffc56fd06d82d4f72a9e97b7832b62c5be4ca0572998b9abaad5770777c3.jpg",
                    "members": 4843
                }
            }
        ]
    },
    {
        "Best Calls of Last 24 Hours": [
            {
                "line1": "1.   🔗 | 🔬 | ♦️ $GENNY by Savannahh Wakanda ℗  | 🎯105x",
                "line2": "📞$4.0k | 🔝$427k | ⏳25/03/25 21:05:47",
                "links": [
                    "https://www.dexscreener.com/solana/gCfxqgfZNenMBt4m6tkqrazcxN6dtvR5LPjYLUwpump",
                    "https://t.me/defaicreatorbot?start=cl_1988420013x25978",
                    "https://t.me/SAVANNAHCALLS/25978"
                ],
                "line3": {
                    "title": "Savannah Wakanda ℗",
                    "username": "SAVANNAHCALLS",
                    "photo": "81acffc56fd06d82d4f72a9e97b7832b62c5be4ca0572998b9abaad5770777c3.jpg",
                    "members": 4843
                }
            },
            {
                "line1": "2.   🔗 | 🔬 | ♦️ $GHIBLI by Based Chad Degens  | 🎯45x",
                "line2": "📞$300k | 🔝$13.5m || ⏳25/03/26 09:53:02",
                "links": [
                    "https://www.dexscreener.com/solana/4TBi66vi32S7J8X1A6eWfaLHYmUXu7CStcEmsJQdpump",
                    "https://t.me/defaicreatorbot?start=cl_2441888429x3702",
                    "https://t.me/BasedchadsGamble/3702"
                ],
                "line3": {
                    "title": "Based Chad Degens",
                    "username": "BasedchadsGamble",
                    "photo": "ccd3d20e587967e700c4948782d20d71eaa52c2434cb0767d8ceb607ee918ebb.jpg",
                    "members": 6457
                }
            },
            {
                "line1": "3.   🔗 | 🔬 | ♦️ $GHIBLI by Altcoinadventures  | 🎯38x",
                "line2": "📞$351k | 🔝$13.5m | ⏳25/03/26 09:52:20",
                "links": [
                    "https://www.deexscreener.com/solana/4TBi66vi32S7J8X1A6eWfaLHYmUXu7CStcEmsJQdpump",
                    "https://t.me/defaicreatorbot?start=cl_2116815656x5538",
                    "https://t.me/AltcoinAdventures/5538"
                ],
                "line3": {
                    "title": "AltcoinAdventures",
                    "username": "AltcoinAdventures",
                    "photo": "29f297484bff4910e287117f2bb1ff2f5b8a3c096c932b09812ffb93f58977d6.jpg",
                    "members": 1613
                }
            },
            {
                "line1": "4.   🔗 | 🔬 | ♦️ $STOOLGUY by Savannah Wakanda ℗  | 🎯25x",
                "line2": "📞$25.0k | 🔝$640k | ⏳25/03/26 01:49:17",
                "links": [
                    "https://www.dexscreener.com/solana/9QPaot8825RbsrErVvJMMGpiRYgtaZMhM5ns9P2Dcpump",
                    "https://t.me/defaicreatorbot?start=cl_1988420013x26106",
                    "https://t.me/SAVANNAHCALLS/26106"
                ],
                "line3": {
                    "title": "Savannah Wakanda ℗",
                    "username": "SAVANNAHCALLS",
                    "photo": "81acffc56fd06d82d4f72a9e97b7832b62c5be4ca0572998b9abaad5770777c3.jpg",
                    "members": 4843
                }
            },
            {
                "line1": "5.   🔗 | 🔬 | ♦️ $STOOLGUY by The Degen Boys  | 🎯17x",
                "line2": "📞$36.9k | 🔝$640k | ⏳25/03/26 01:56:01",
                "links": [
                    "https://www.dexscreener.com/solana/9QPaot8825RbsrErVvJMGpiRYgtaZMhM5ns9P2Dcpump",
                    "https://t.me/defaicreattorbot?start=cl_2141713314x15798",
                    "https://t.me/TheDegenBoysLounge/15798"
                ],
                "line3": {
                    "title": "THE DEGEN BOYS",
                    "username": "TheDegenBoysLounge",
                    "photo": "9b03c9b14f56a80516dd4715de815e0323e9fa9b5811188db4fa12839fbbf6ae.jpg",
                    "members": 3336
                }
            },
            {
                "line1": "6.   🔗 | 🔬 | ♦️ $BIGBODY by Savannah Wakanda ℗  | 🎯14x",
                "line2": "📞$8.1k | 🔝$115k | ⏳25/03/26 05:05:29",
                "links": [
                    "https://www.dexscreener.com/solana/HD7pg7Wdhb1m4szWeR787sKChvKatxEcRusSRHRqpump",
                    "https://t.me/defaicreatorbot?start=cl_1988420013x26184",
                    "https:///t.me/SAVANNAHCALLS/26184"
                ],
                "line3": {
                    "title": "Savannah Wakanda ℗",
                    "username": "SAVANNAHCALLS",
                    "photo": "81acffc56fd06d82d4f72a9e97b7832b62c5be4ca0572998b9abaad5770777c3.jpg",
                    "members": 4843
                }
            },
            {
                "line1": "7.   🔗 | 🔬 | ♦️ $BITBOY by Coinbar  | 🎯13x",
                "line2": " 📞$97.3k | 🔝$1.3m | ⏳25/03/26 01:45:48",
                "links": [
                    "https://www.dexscreener.com/solana/9ZpzuppLqYiamNRKnMzeShWTe3iEhV8gousCh5jmpump",
                    "https://t.me/defaicreatorbot?start=cl_2368123901x5930",
                    "https://t.me/COINBAR100x/5930"
                ],
                "line3": {
                    "title": "COINBAR",
                    "username": "COINBAR100x",
                    "photo": "5470362a4328912a7dc3a677ee46521ffed9c1409c4fa65f1444d78591253b9e.jpg",
                    "members": 1315
                }
            },
            {
                "line1": "8.   🔗 | 🔬 | 🔶 $FORA by Gamble Or Alpha  | 🎯13x",
                "line2": "📞$61.1k | 🔝$811k | ⏳25/03/26 06:40:37",
                "links": [
                    "https://www.dexscreener.com/bsc/0x83edD3923940422f780072052b30f2BE9DA9b831",
                    "https://t.me/defaicreatorbot?start=cl_2465584548x998",
                    "https://t.me/Gambleoralpha/998"
                ],
                "line3": {
                    "title": "Gamble Or Alpha",
                    "username": "Gambleoralpha",
                    "photo": "2f1d14296f7861400b52a4361ee046018b20ade6e37f34ec57013a0059cf2a9c.jpg",
                    "members": 972
                }
            },
            {
                "line1": "9.   🔗 | 🔬 | 🔶 $FORA by Alfa Calls  | 🎯13x",
                "line2": "📞$61.1k | 🔝$811k | ⏳25/03/26 06:40:58",
                "links": [
                    "https://www.dexscreener.com/bsc/0x83edD3923940422f780072052b30f2BE9DA9b831",
                    "https://t.me/defaicreatorbot?start=cl_1918052598x3451",
                    "https://t.me/ALFA1_CALLS/3451"
                ],
                "line3": {
                    "title": "Alfa Calls",
                    "username": "ALFA1_CALLS",
                    "photo": "07581003a18337ff3f285a164a00e06b46caa098b259ca765bb2d8dc231817ca.jpg",
                    "members": 41803
                }
            },
            {
                "line1": "10. 🔗 | 🔬 | ♦️ $FUUCK by Sultan Plays  | 🎯12x",
                "line2": "📞$7.0k | 🔝$85.6k | ⏳25/03/25 20:35:20",
                "links": [
                    "https://www.dexscreener.com/solana/HrngCeNwbSLbDxmpMWXjUTPJEg5hQpsxgmj8UArfpump",
                    "https://t.me/defaicreatorbot?start=cl_1554385364x8132",
                    "https://t.me/SultanPlays/8132"
                ],
                "line3": {
                    "title": "Sultan Plays",
                    "username": "SultanPlays",
                    "photo": "398edc203846dc565f600934dee8ce95617be7191ea6afc2678bd61340ee39cd.jpg",
                    "members": 9673
                }
            }
        ]
    },
    {

    }
] */

export async function GET() {
    try {
        return NextResponse.json(msgParsed)
    } catch (error) {
        NextResponse.error();
        console.error('Failed to start API', error);
    }
} 
