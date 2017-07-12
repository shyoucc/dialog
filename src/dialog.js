/**
 * @author zhixie
 *
 * @modified 2016-7-12
 */

(function(root, factory){
    if (typeof define === 'function' && define.amd) {
        define([],  factory)
    } else if (typeof exports === 'object') {
        module.exports = factory()
    } else {
        root.Dialog = factory()
    }
}(this, function(){
    'use strict'

        let Dialog = function(options){
            let originalOptions = options || {}
            // 如果只穿了字符串的话，默认内容
            if (typeof originalOptions === 'string') {
                originalOptions = {
                    content: options
                }
            }
            this.opts = Object.assign({}, originalOptions)

            // 如果已经有弹窗，就返回
            // if (document.getElementsByClassName('ui-dialog').length !== 0) {
            //     return;
            // };

            // dom初始化 并且监听
            this._init()
            // 创建弹窗单列
            let one = this._getSingle(this._create)
            this.wrapperOne = one()
            append(this.body, this.wrapperOne)

            // this._on()

        }

        let _prototype = Dialog.prototype

        _prototype._init = function(){
            // 字符串模板
            this.body = this.$('body')

            this.tmp_wrapper = '<div class="ui-dialog ui-popup-show"></div>'
            this.tmp_mask = '<div class="ui-dialog-mask"></div>'
            this.tmp_header = '<div class="ui-dialog-header"></div>'
            this.tmp_content = '<div class="ui-dialog-content"></div>'
            this.tmp_btns = '<div class="ui-dialog-btns"></div>'

            this.tmp_spinner = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
            this.tmp_cancel = '<div class="ui-dialog-button btn-cancel">取消</div>'
            this.tmp_confirm = '<div class="ui-dialog-button btn-confirm">确定</div>'

            return this
        }

        _prototype._create = function(){
            let that = this

            let wrapper = parseToDOM(this.tmp_wrapper)
            let mask = parseToDOM(this.tmp_mask)
            let header = parseToDOM(this.tmp_header)
            let content = parseToDOM(this.tmp_content)
            let btns = parseToDOM(this.tmp_btns)
            let btn_confirm = parseToDOM(this.tmp_confirm)
            let btn_cancel = parseToDOM(this.tmp_cancel)
            let spinner = parseToDOM(this.tmp_spinner)

            // 如果什么都没传的话
            if (Object.keys(that.opts).length === 0) {
                append(content, spinner)
                append(wrapper, content)
            }

            // 传入字符串，内容
            if (that.opts.content) {
               header.innerHTML = that.opts.title || '提示'
               content.innerHTML = that.opts.content
               append(btns, btn_confirm)
               append(wrapper, header)
               append(wrapper, content)
               append(wrapper, btns)

               // confirm 回调
               btn_confirm.onclick = function(){
                 that._remove()
                 if (that.opts.confirmCallback && isFunction(that.opts.confirmCallback)) {
                    that.opts.confirmCallback()
                 }
               }

            }

            // 有遮罩
            if (that.opts.showMask) {
               append(that.body, mask)
            }

            // 有取消按钮
            if (that.opts.showCancel) {
                append(btns, btn_cancel)
                btn_cancel.onclick = function(){
                    that._remove()
                }
            }

            // 延时关闭
            if (that.opts.delay) {
                setTimeout(() => {
                    that._remove()
                    // 执行返回函数
                    if (that.opts.delayCallback && isFunction(that.opts.delayCallback)) {
                        that.opts.delayCallback()
                    }
                }, that.opts.delay)
            }

            // 返回dom主体
            return wrapper

        }

        // _prototype._on = function(){
        //     let that = this

        //     // 只要传参数，就监听关闭时间
        //     if (Object.keys(that.opts).length !== 0) {
        //         on(that.$('.ui-dialog-button'), 'click', function(e){
        //             that._remove()
        //             e.stopPropagation()
        //         })
        //     }
        // }

        _prototype._remove = function(){
            let that = this

            if (this.wrapperOne.parentNode) {
                this.wrapperOne.parentNode.removeChild(this.wrapperOne);

                // 遮罩处理
                if (document.getElementsByClassName('ui-dialog-mask').length !== 0) {
                    this.body.removeChild(this.$('.ui-dialog-mask'))
                }
            }
            // this.body.removeChild(this.wrapperOne)
        }

        _prototype._getSingle = function(fn){
            let that = this
            let result = null
            return function(){
                return result || (result = fn.apply(that, arguments))
            }
        }

        _prototype.$ = function(element){
            return document.querySelector(element)
        }

        function on(element, eventType, fn) {
            element.addEventListener(eventType, e => {
              let el = e.target
              el && fn.call(el, e, el)
            },  {once: true})
            return element
        }

        function isFunction(fun){
            return toString.call(fun) === '[object Function]'
        }

        function parseToDOM(str){
            var template = document.createElement('template')
            template.innerHTML = str.trim()
            let node = template.content.firstChild
            return node
        }

        function append(parent, children) {
            if (children.length === undefined) {
              children = [children]
            }
            for (let i = 0; i < children.length; i++) {
              parent.appendChild(children[i])
            }
            return parent
        }

    return Dialog

}))
