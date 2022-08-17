document.addEventListener('DOMContentLoaded', function () {
    let ipt = document.querySelector('#title')
    let ol = document.querySelector('#todolist')
    let ul = document.querySelector('#donelist')
    let span1 = document.querySelector('#todocount')
    let span2 = document.querySelector('#donecount')
    let arr = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : []
    // 输入框绑定键盘事件
    ipt.addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
            // console.log('666')
            arr.push({
                task: this.value,
                isDone: false
            })
            localStorage.setItem('taskList', JSON.stringify(arr))
            render()
            sum()
            this.value = ''
        }

    })
    // 渲染函数
    render()
    function render() {
        ul.innerHTML = ``
        ol.innerHTML = ``
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].isDone) {
                ul.innerHTML += `<li>
                                    <input type="checkbox" checked data-id="${i}"> 
                                    <p data-id="${i}">${arr[i].task}</p> 
                                    <a href="javascript:;" data-id="${i}"></a>
                                </li>`
            } else {
                ol.innerHTML += `<li>
                                    <input type="checkbox" data-id="${i}"> 
                                    <p data-id="${i}">${arr[i].task}</p> 
                                    <a href="javascript:;" data-id="${i}"></a>
                                </li>`
            }
        }
    }

    //点击删除按钮，删除任务
    let section = document.querySelector('section:nth-child(2)')
    section.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            // console.log();
            arr.splice(e.target.dataset.id, 1)
            localStorage.setItem('taskList', JSON.stringify(arr))
            render()
        }
    })

    // 勾选复选框改变完成状态

    section.addEventListener('click', function (e) {
        if (e.target.tagName === 'INPUT' && e.target.typr == 'checkbox') {
            // console.log(e.target.dataset.id)
            if (arr[e.target.dataset.id].isDone) {
                arr[e.target.dataset.id].isDone = false
            } else {
                arr[e.target.dataset.id].isDone = true
            }
            localStorage.setItem('taskList', JSON.stringify(arr))
            render()

        }
        sum()
    })

    // 进行中和完成的个数

    sum()
    function sum() {
        let go = []
        let over = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].isDone) {
                over.push(arr[i])
            } else {
                go.push(arr[i])
            }

        }
        // console.log(go.length);
        // console.log(over.length);
        span1.innerHTML = `<span id="todocount">${go.length}</span>`
        span2.innerHTML = `<span id="todocount">${over.length}</span>`
    }

    section.addEventListener('dblclick', function (e) {
        if (e.target.tagName === 'P') {
            e.target.innerHTML = `<input type="text" value="${e.target.innerHTML}">`
            e.target.querySelector('input').addEventListener('blur', function () {
                arr[e.target.dataset.id].task = this.value
                this.style.border = 'none'
                localStorage.setItem('taskList', JSON.stringify(arr))
                render()
            })
        }
    })

})