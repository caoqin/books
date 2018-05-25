<template>
    <div class="hello">
        <div class="url" @click="showInput">url</div>
        <h3>{{title}}</h3>
        <p v-html="txt"></p>
        <div class="footer">
            <span v-for="item in ctrols" @click="httpData(item.link)">{{ item.name}}</span>
        </div>
        <div class="mask" v-show="showUrl">
            <input v-model="curPath"/>
            <div class="mask-f">
                <button @click="sureInput">确定</button>
                <button @click="showInput">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Api from '../utils/api'

    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            return {
                showUrl: false,
                curPath: "",
                title: "",
                txt: "",
                ctrols: []
            }
        },
        created() {
            window.map = this;
            this.curPath = localStorage.getItem("curPath") || '/files/article/html/14/14949/7797534.html';
            this.httpData(this.curPath);
        },
        methods: {
            showInput() {
                this.showUrl = !this.showUrl;
            },
            sureInput() {
                this.httpData( this.curPath);
                this.showInput();
            },
            httpData(path) {
                const arr = path.split("/");
                const self = this;
                if (!isNaN(parseInt(arr[arr.length - 1].split(".")[0]))) {
                    Api.getTxts(path).then(res => {
                        self.title = res.title;
                        self.txt = res.txt;
                        self.ctrols = res.ctrols;
                        localStorage.setItem("curPath", path);
                        self.$nextTick(() => {
                            window.scrollTo(0, 0)
                        })
                    })
                } else {
                    Api.getTxts(path).then(res => {
                        self.title = res.title;
                        self.txt = `<table>${res.txt}</table>`;
                        self.ctrols = res.ctrols;
                        self.$nextTick(() => {
                            window.scrollTo(0, 0)
                        })
                    })
                }
            }
        }
    }
</script>


<style>
    h3 {
        margin: 0;
        padding: 10px;
        text-align: center;
    }

    p {
        font-size: 16px;
        padding: 8px;
        line-height: 1.7em;
    }

    .hello {
        background-color: rgba(199, 238, 206, 0.85);
    }

    .footer {
        height: 52px;
        text-align: center;
    }

    span {
        padding: 5px 10px;
        margin-left: 8px;
        border-radius: 6px;
        border: 1px solid #ccc;
        cursor: pointer;
    }

    .title {
        cursor: pointer;
    }

    .url {
        position: fixed;
        padding: 12px;
        top: 0;
        right: 0;
        background: rgba(183, 127, 127, 0.4);
        border-radius: 0 0 0 25px;
        color: aliceblue;
        cursor: pointer;
    }

    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
        background-color: rgba(245, 245, 220, 0.66);
    }

    .mask-f {
        text-align: center;
    }

    input {
        width: 80%;
        margin: 25% 0 10px 10%;
        padding: 12px;
        border-radius: 10px;
        outline: none;
        border: 1px solid #ccc;
    }

    button {
        border-radius: 8px;
        border: 1px solid #ccc;
        outline: none;
        padding: 8px 20px;
        margin: 10px;
        text-align: center;
        background-color: #9799da;
        color: #fff;
        cursor: pointer;
    }

    input:active,
    button:active {
        border: 1px solid #ccc;
        outline: none;
    }
</style>
