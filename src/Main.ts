class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public static click : boolean;

    public static getInstance(){

        return this;
    }

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private textfield:egret.TextField;

    //对话任务面板的ui
    public static dialogPanelContent1 = new egret.TextField();
    public static dialogPanelContent2 = new egret.TextField();
    public static dialogPanelContent3 = new egret.TextField();
    public static dialogPanelContent4 = new egret.TextField();
    public static dialogPanelButton = new egret.TextField();
    public static taskPanelContent1 = new egret.TextField();
    public static taskPanelContent2 = new egret.TextField();
    public static taskPanelContent3 = new egret.TextField();
    public static taskPanelContent4 = new egret.TextField();
    //emoji
    public static n0Emoji = new egret.TextField();
    public static n1Emoji = new egret.TextField();

    public showPanel(task : Task, tag : String){
        //任务面板
        if(tag == "taskpanel not accept0" || tag == "taskpanel submitted0"){

            Main.taskPanelContent1.x = 50;
            Main.taskPanelContent1.y = 50;
            Main.taskPanelContent1.size = 20;
            Main.taskPanelContent1.text = "暂时没有任务";
            Main.taskPanelContent1.textColor = 0xFFFF00;

            Main.taskPanelContent2.text = "";
            Main.taskPanelContent3.text = "";
            Main.taskPanelContent4.text = "";

        }else if(tag == "taskpanel acceptted0" || tag == "taskpanel cansubmit0"){

            Main.taskPanelContent1.x = 30;
            Main.taskPanelContent1.y = 50;
            Main.taskPanelContent1.size = 20;
            Main.taskPanelContent1.text = "任务名称: " + task.getName();
            Main.taskPanelContent1.textColor = 0xFFFF00;

            Main.taskPanelContent2.x = 30;
            Main.taskPanelContent2.y = 100;
            Main.taskPanelContent2.size = 20;
            Main.taskPanelContent2.text = "发布任务NPC: " + task.getFromNpcId();
            Main.taskPanelContent2.textColor = 0xFFFF00;

            Main.taskPanelContent3.x = 30;
            Main.taskPanelContent3.y = 150;
            Main.taskPanelContent3.size = 20;
            Main.taskPanelContent3.text = "完成任务NPC: " + task.getToNpcId();
            Main.taskPanelContent3.textColor = 0xFFFF00;

            Main.taskPanelContent4.x = 30;
            Main.taskPanelContent4.y = 200;
            Main.taskPanelContent4.size = 20;
            Main.taskPanelContent4.text = "任务状态： " + task.getStatus();
            Main.taskPanelContent4.textColor = 0xFFFF00;

        }

        if(tag == "taskpanel not accept1" || tag == "taskpanel submitted1"){

            Main.taskPanelContent1.x = 30;
            Main.taskPanelContent1.y = 50;
            Main.taskPanelContent1.size = 20;
            Main.taskPanelContent1.text = "无进行中的任务";
            Main.taskPanelContent1.textColor = 0xFFFF00;

            Main.taskPanelContent2.text = "";
            Main.taskPanelContent3.text = "";
            Main.taskPanelContent4.text = "";

        }else if(tag == "taskpanel acceptted1" || tag == "taskpanel cansubmit1"){

            Main.taskPanelContent1.x = 30;
            Main.taskPanelContent1.y = 50;
            Main.taskPanelContent1.size = 20;
            Main.taskPanelContent1.text = "任务名称: " + task.getName();
            Main.taskPanelContent1.textColor = 0xFFFF00;

            Main.taskPanelContent2.x = 30;
            Main.taskPanelContent2.y = 100;
            Main.taskPanelContent2.size = 20;
            Main.taskPanelContent2.text = "发布任务NPC: " + task.getFromNpcId();
            Main.taskPanelContent2.textColor = 0xFFFF00;

            Main.taskPanelContent3.x = 30;
            Main.taskPanelContent3.y = 150;
            Main.taskPanelContent3.size = 20;
            Main.taskPanelContent3.text = "完成任务NPC: " + task.getToNpcId();
            Main.taskPanelContent3.textColor = 0xFFFF00;

            Main.taskPanelContent4.x = 30;
            Main.taskPanelContent4.y = 200;
            Main.taskPanelContent4.size = 20;
            Main.taskPanelContent4.text = "任务状态： " + task.getStatus();
            Main.taskPanelContent4.textColor = 0xFFFF00;

        }


        //对话面板
        if(tag == "accept0"){

            Main.dialogPanelContent1.x = 100;
            Main.dialogPanelContent1.y = 600;
            Main.dialogPanelContent1.text = "任务名称: " + task.getName();

            Main.dialogPanelContent2.x = 200;
            Main.dialogPanelContent2.y = 650;
            Main.dialogPanelContent2.text = "发布任务NPC: " + task.getFromNpcId();

            Main.dialogPanelContent3.x = 200;
            Main.dialogPanelContent3.y = 700;
            Main.dialogPanelContent3.text = "完成任务NPC: " + task.getToNpcId();

            Main.dialogPanelContent4.x = 200;
            Main.dialogPanelContent4.y = 750;
            Main.dialogPanelContent4.text = "任务状态： " + task.getStatus();
            
            Main.dialogPanelButton.x = 300;
            Main.dialogPanelButton.y = 800;
            Main.dialogPanelButton.text = "接受";
            Main.dialogPanelButton.touchEnabled = true;
            Main.dialogPanelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

                Main.dialogPanelButton.text = "";
                Main.dialogPanelContent1.text = "";
                Main.dialogPanelContent2.text = "";
                Main.dialogPanelContent3.text = "";
                Main.dialogPanelContent4.text = "";
                task.onAccept();


            },this);
   
        }else if(tag == "finish0"){

            Main.dialogPanelContent1.x = 100;
            Main.dialogPanelContent1.y = 600;
            Main.dialogPanelContent1.text = "任务名称: " + task.getName();

            Main.dialogPanelContent2.x = 200;
            Main.dialogPanelContent2.y = 650;
            Main.dialogPanelContent2.text = "发布任务NPC: " + task.getFromNpcId();

            Main.dialogPanelContent3.x = 200;
            Main.dialogPanelContent3.y = 700;
            Main.dialogPanelContent3.text = "完成任务NPC: " + task.getToNpcId();

            Main.dialogPanelContent4.x = 200;
            Main.dialogPanelContent4.y = 750;
            Main.dialogPanelContent4.text = "任务状态： " + task.getStatus();

            Main.dialogPanelButton.x = 300;
            Main.dialogPanelButton.y = 800;
            Main.dialogPanelButton.text = "完成";
            Main.dialogPanelButton.touchEnabled = true;
            Main.dialogPanelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

                Main.dialogPanelButton.text = "";
                Main.dialogPanelContent1.text = "";
                Main.dialogPanelContent2.text = "";
                Main.dialogPanelContent3.text = "";
                Main.dialogPanelContent4.text = "";
                task.onSubmit();


            },this);
        }

        if(tag == "accept1"){


            Main.dialogPanelContent1.x = 100;
            Main.dialogPanelContent1.y = 600;
            Main.dialogPanelContent1.text = "任务名称: " + task.getName();

            Main.dialogPanelContent2.x = 200;
            Main.dialogPanelContent2.y = 650;
            Main.dialogPanelContent2.text = "发布任务NPC: " + task.getFromNpcId();

            Main.dialogPanelContent3.x = 200;
            Main.dialogPanelContent3.y = 700;
            Main.dialogPanelContent3.text = "完成任务NPC: " + task.getToNpcId();

            Main.dialogPanelContent4.x = 200;
            Main.dialogPanelContent4.y = 750;
            Main.dialogPanelContent4.text = "任务状态： " + task.getStatus();
            
            Main.dialogPanelButton.x = 300;
            Main.dialogPanelButton.y = 800;
            Main.dialogPanelButton.text = "接受";
            Main.dialogPanelButton.touchEnabled = true;
            Main.dialogPanelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

            Main.n1Emoji.text = "";
            Main.dialogPanelButton.text = "";
            Main.dialogPanelContent1.text = "";
            Main.dialogPanelContent2.text = "";
            Main.dialogPanelContent3.text = "";
            Main.dialogPanelContent4.text = "";
            task.onAccept();

        },this);

    }else if(tag == "finish1"){

            Main.dialogPanelContent1.x = 100;
            Main.dialogPanelContent1.y = 600;
            Main.dialogPanelContent1.text = "任务名称: " + task.getName();

            Main.dialogPanelContent2.x = 200;
            Main.dialogPanelContent2.y = 650;
            Main.dialogPanelContent2.text = "发布任务NPC: " + task.getFromNpcId();

            Main.dialogPanelContent3.x = 200;
            Main.dialogPanelContent3.y = 700;
            Main.dialogPanelContent3.text = "完成任务NPC: " + task.getToNpcId();

            Main.dialogPanelContent4.x = 200;
            Main.dialogPanelContent4.y = 750;
            Main.dialogPanelContent4.text = "任务状态： " + task.getStatus();

            Main.dialogPanelButton.x = 300;
            Main.dialogPanelButton.y = 800;
            Main.dialogPanelButton.text = "完成";
            Main.dialogPanelButton.touchEnabled = true;
            Main.dialogPanelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

                Main.dialogPanelButton.text = "";
                Main.dialogPanelContent1.text = "";
                Main.dialogPanelContent2.text = "";
                Main.dialogPanelContent3.text = "";
                Main.dialogPanelContent4.text = "";
                task.onSubmit();
            },this);
    }

}
    public showEmoji(emoji : String){

        //task0
        if(emoji == "yellow !0"){
           
            Main.n0Emoji.text = "!  !  !";
            Main.n0Emoji.size = 72;
            Main.n0Emoji.x = 80;
            Main.n0Emoji.y = 280;
            Main.n0Emoji.size = 48;
            Main.n0Emoji.textColor = 0xFFFF00;
            

        }else if(emoji == "yellow ?0"){

            Main.n0Emoji.text = "";


            Main.n1Emoji.text = "?  ?  ?";
            Main.n1Emoji.x = 450;
            Main.n1Emoji.y = 250;
            Main.n1Emoji.size = 48;
            Main.n1Emoji.textColor = 0xFFFF00;

        }else if(emoji == "0"){

            Main.n0Emoji.text = "";
            Main.n1Emoji.text = "";
        }

        
        //task1
        if(emoji == "yellow !1"){

            Main.n1Emoji.text = "！ ！ ！";
             Main.n1Emoji.x = 450;
            Main.n1Emoji.y = 250;
            Main.n1Emoji.size = 48;
            Main.n1Emoji.textColor = 0xFFFF00;

        }else if(emoji == "yellow ?1"){

            Main.n1Emoji.text = "";

            Main.n0Emoji.text = "?  ?  ?";
            Main.n0Emoji.x = 40;
            Main.n0Emoji.y = 220;
            Main.n0Emoji.size = 48;
            Main.n0Emoji.textColor = 0xFFFF00;

        }else if(emoji == "1"){

            Main.n0Emoji.text = "";
            Main.n1Emoji.text = "";
        }


    }

    private createGameScene():void {

        // var sky:egret.Bitmap = this.createBitmapByName("a_png");
        // this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;

        var p1Container = new egret.DisplayObjectContainer(); 
        this.addChild(p1Container);
        p1Container.width = stageW;
        p1Container.height = stageH;

        var bg1:egret.Bitmap = this.createBitmapByName("a_png");
        p1Container.addChild(bg1);
        bg1.width = stageW;
        bg1.height = stageH;

        // this.touchEnabled = true;

        var Mask1 = new egret.Shape();
        Mask1.graphics.beginFill(0x000000, 0.5);
        Mask1.graphics.drawRect(0, 0,500, 200);
        Mask1.graphics.endFill();
        Mask1.x = 20;
        Mask1.y = 20;
        p1Container.addChild(Mask1);

        var Mask2 = new egret.Shape();
        Mask2.graphics.beginFill(0x000000, 0.5);
        Mask2.graphics.drawRect(0, 0, stageW,360);
        Mask2.graphics.endFill();
        Mask2.y = 520;
        p1Container.addChild(Mask2);


        var NPC0 = new NPC("npc_0");
        var NPC1 = new NPC("npc_1");

        var taskPanel = new TaskPanel("dialogpanel");
        var taskAllTimePanel = new TaskPanel("taskpanel");
        var taskService = TaskService.getInstance();

        var task = new Task("0", "将消息传递给另一个NPC", TaskStatus.ACCEPTABLE, "npc_0", "npc_1", "talk");
        var task1 = new Task("1", "杀10只怪", TaskStatus.UNACCEPTABLE, "npc_1", "npc_0", "kill");


        var N0 = this.createBitmapByName("npc1_png");
        N0.x = 50;
        N0.y = 300
        N0.width = 156;
        N0.height = 220;
        N0.touchEnabled = true;
        N0.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

            Main.click = true;
            TaskService.getInstance().notify(task);
            TaskService.getInstance().notify(task1);
            
        }, this);

        this.addChild(N0);

        var N1 = this.createBitmapByName("npc2_png");
        N1.x = 450;
        N1.y = 300;
        N1.width = 131;
        N1.height = 220;
        N1.touchEnabled = true;
        N1.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

           
            Main.click = true;
            TaskService.getInstance().notify(task);
            TaskService.getInstance().notify(task1);
            
        }, this);
        this.addChild(N1);


        var killButton = new KillButton();
        var sceneService = SceneService.getInstance();
        sceneService.addObserver(killButton);


        var killButtonText = new egret.TextField();
        killButtonText.x = 250;
        killButtonText.y = 1000;
        killButtonText.text = "怪(点击）"
        killButtonText.touchEnabled = true;
        killButtonText.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){

            sceneService.notify();

        },this);

        this.addChild(killButtonText);
        this.addChild(Main.n0Emoji);
        this.addChild(Main.n1Emoji);
        this.addChild(Main.dialogPanelContent1);
        this.addChild(Main.dialogPanelContent2);
        this.addChild(Main.dialogPanelContent3);
        this.addChild(Main.dialogPanelContent4);
        this.addChild(Main.dialogPanelButton);

        this.addChild(Main.taskPanelContent1);
        this.addChild(Main.taskPanelContent2);
        this.addChild(Main.taskPanelContent3);
        this.addChild(Main.taskPanelContent4);


        taskService.addObserver(NPC0);
        taskService.addObserver(NPC1);
        taskService.addObserver(taskPanel);
        taskService.addObserver(taskAllTimePanel);
        taskService.addTask(task);
        taskService.addTask(task1);

        taskService.getTaskByCustomRule(function(taskList : Task[]) : Task{

            for(var i = 0; i < taskList.length; i++){

                if(taskList[i].getStatus() == TaskStatus.ACCEPTABLE){

                    taskService.notify(taskList[i]);
                    return taskList[i];
                }
            }
        });  
        
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


