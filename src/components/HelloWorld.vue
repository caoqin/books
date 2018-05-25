<template>
    <div class="hello">
        <h3>{{title}}</h3>
        <p v-html="txt"></p>
        <div class="footer">
            <span v-for="item in ctrols" @click="httpData(item.link)">{{ item.name}}</span>
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


<style scoped>
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
</style>
