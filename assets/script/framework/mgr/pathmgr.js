/*------------------------------------------------------------------------------------------
--
--　　　　　　　┏┓　　　┏┓+ +
--　　　　　　┏┛┻━━━┛┻┓ + +
--　　　　　　┃　　　　　　　┃ 　
--　　　　　　┃　　　━　　　┃ ++ + + +
--　　　　　 ████━████ ┃+
--　　　　　　┃　　　　　　　┃ +
--　　　　　　┃　　　┻　　　┃
--　　　　　　┃　　　　　　　┃ + +
--　　　　　　┗━┓　　　┏━┛
--　　　　　　　　┃　　　┃　　　　　　　　　　　
--　　　　　　　　┃　　　┃ + + + +
--　　　　　　　　┃　　　┃　　　　　　　　　　　
--　　　　　　　　┃　　　┃ + 　　　　　　
--　　　　　　　　┃　　　┃
--　　　　　　　　┃　　　┃　　+　　　　　　　　　
--　　　　　　　　┃　 　　┗━━━┓ + +
--　　　　　　　　┃ 　　　　　　　┣┓
--　　　　　　　　┃ 　　　　　　　┏┛
--　　　　　　　　┗┓┓┏━┳┓┏┛ + + + +
--　　　　　　　　　┃┫┫　┃┫┫
--　　　　　　　　　┗┻┛　┗┻┛+ + + +
--
-- 
-- Code is far away from bug with the animal protecting
-- Author  : (moxun)hongchang.huang
------------------------------------------------------------------------------------------*/
var PathMgr = cc.Class({
    properties: 
    {
        COMM_GOLD: "texture/comm/Icon_Answer_JinBi",
        COMM_DAN: "texture/comm/Icon_Answer_duanwei",
        COMM_LEVEL: "texture/comm/Icon_Answer_dengji",
        COMM_EXP: "texture/comm/Icon_Answer_jingyan",
        COMM_STAR: "texture/comm/Om_Answer_XingXing",
        COMM_BOY: "texture/comm/Om_Fit_nan",
        COMM_GIRL: "texture/comm/Om_Fit_nv",

        BATTLE_ANSWER_BTN_BG_NORMAL: "texture/battle/Box_Answer_daan1",
        BATTLE_ANSWER_BTN_BG_TRUE: "texture/battle/Box_Answer_daan2",
        BATTLE_ANSWER_BTN_BG_FALSE: "texture/battle/Box_Answer_daan3",
        BATTLE_ANSWER_BTN_BG_WAIT: "texture/battle/Box_Answer_daan4",

        BATTLE_ANSWER_TRUE: "texture/battle/Om_Answer_dui",
        BATTLE_ANSWER_FALSE: "texture/battle/Om_Answer_cuo",
        BATTLE_RESULT_WIN: "texture/battle/account/Om_Answer_shengli",
        BATTLE_RESULT_DRAW: "texture/battle/account/Om_Answer_daping",
        BATTLE_RESULT_LOST: "texture/battle/account/Om_Answer_liangliang",

        BATTLE_RESULT_TITLE_A: "texture/battle/account/Om_Answer_a",
        BATTLE_RESULT_TITLE_S: "texture/battle/account/Om_Answer_s",
        BATTLE_RESULT_TITLE_SS: "texture/battle/account/Om_Answer_ss",
        BATTLE_RESULT_TITLE_SSS: "texture/battle/account/Om_Answer_sss",

        RANK_STAR_BG_1: "texture/rank/Box_rankinglist_6",
        RANK_STAR_BG_NORMAL: "texture/rank/Box_rankinglist_7",
        RANK_STAR_BG_SELF: "texture/rank/Box_rankinglist_8",

        BATTLE_IMGBG_1: "texture/battle/Box_Answer_Di2",
        BATTLE_IMGBG_2: "texture/battle/Box_Answer_Di3",

        RANK_ITEM_BG_1: "texture/rank/Box_rankinglist_1",
        RANK_ITEM_BG_2: "texture/rank/Box_rankinglist_2",
        RANK_ITEM_BG_3: "texture/rank/Box_rankinglist_3",
        RANK_ITEM_BG_NORMAL: "texture/rank/Box_rankinglist_4",

        SOUND_MAIN_BG: "resources/sound/home_bg.mp3",
        SOUND_MATCH_BG: "resources/sound/game_match_bg.mp3",
        SOUND_BTN_CLICK: "resources/sound/btn_click.mp3",
        SOUND_CHANGE_VIEW: "resources/sound/topic_pop_up.mp3",
        SOUND_MATCH_START: "resources/sound/chest_get.mp3",
        SOUND_MATCH_OVER: "resources/sound/game_start.mp3",
        SOUND_READY_GO: "resources/sound/ready_go.mp3",
        SOUND_ROUNG_BEGIN: "resources/sound/get_new_msg.mp3",
        SOUND_ANSWER_RIGHT: "resources/sound/answer_right.mp3",
        SOUND_ANSWER_WRONG: "resources/sound/answer_wrong.mp3",
        SOUND_COMBO_3: "resources/sound/result_right_random_3.mp3",
        SOUND_COMBO_5: "resources/sound/result_right_random_5.mp3",
        SOUND_WIN_NORMAL: "resources/sound/result_succ.mp3",
        SOUND_WIN_SPECIAL: "resources/sound/rensult_win_op_hunt.mp3",
        SOUND_FAIL: "resources/sound/result_fail.mp3",
        SOUND_DRAW: "resources/sound/result_draw.mp3",

        SOUND_LEVEL_UP: "resources/sound/level_up.mp3",
        SOUND_DAN_UP: "resources/sound/rank_up.mp3",
        SOUND_ADD_MONEY: "resources/sound/spending_money.mp3",
        // FONT_ROOM_ITEM: "texture"
    },

    ctor()
    {
    },

    getRoundCountId(id)
    {
        var maxCount = Global.battleMgr.getRoundCount()
        if(id == maxCount - 1)
        {
            return "texture/battle/round/Txt_Answer_2_zuihouyiti"
        }
        var path = "texture/battle/round/Txt_Answer_2_" + parseInt(id + 1)
        console.log("pathmgr getRoundCountId -> ", path)
        return path
    },
    
    getRoundTypeByData(data)
    {
        if(data == null)
        {
            console.log("pathMgr getRoundTitleByData data NULL")
            return
        }
        var path = "texture/battle/subject/Txt_Answer_" + data.superGate + "_" + data.gate
        console.log("pathmgr getRoundTypeByData -> ", data, path)
        return path
    },

    getAnswerBgByType(type)
    {
        if(type == 2)
        {   
            return this.BATTLE_IMGBG_2
        }
        return this.BATTLE_IMGBG_1
    },

    getRankItemBg(index)
    {
        if(index == 1)
        {
            return this.RANK_ITEM_BG_1
        }else if(index == 2)
        {
            return this.RANK_ITEM_BG_2
        }else if(index == 3)
        {
            return this.RANK_ITEM_BG_3
        }else
        {
            return this.RANK_ITEM_BG_NORMAL
        }
    },

    getSexIcon(sex)
    {
        return null
        if(sex == Global.typeConfig.Sex.Girl)
        {
            return this.COMM_GIRL
        }
        return this.COMM_BOY
    },

    getStarBgByRank(rank)
    {
        // console.log("getStarBgByRank rank -> ", rank)
        if(rank == 1)
        {
            return this.RANK_STAR_BG_1
        }else
        {
            return this.RANK_STAR_BG_NORMAL
        }
    },
});

module.exports = new PathMgr()
