/**
 * @author zhixie
 *
 * @modified 2016-7-11
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
            if (document.getElementsByClassName('ui-dialog').length !== 0) {
                return;
            };
            this.create()

        }

        let _prototype = Dialog.prototype

        _prototype.create = function(){
            let that = this

            // 字符串模板
            let body = $('body')
            let tmp_wrapper = '<div class="ui-dialog ui-popup-show"><div class="ui-dialog-header"></div><div class="ui-dialog-content"></div><div class="ui-dialog-btns"></div></div>'
            let tmp_spinner = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
            let tmp_confirm = '<div class="ui-dialog-button btn-confirm">确定</div>'
            let tmp_mask = '<div class="ui-dialog-mask"></div>'

            let wrapper = parseToDOM(tmp_wrapper)
            append(body, wrapper)

            let tmp_header = $('.ui-dialog-header')
            let tmp_content = $('.ui-dialog-content')
            let tem_btns = $('.ui-dialog-btns')

            // 如果什么都没传的话
            if (Object.keys(that.opts).length === 0) {
                append(tmp_content, parseToDOM(tmp_spinner))
                hide(tmp_header)
                hide(tem_btns)
            }

            // 传入字符串，内容
            if (that.opts.content) {
               tmp_header.innerHTML = '提示'
               tmp_content.innerHTML = that.opts.content
               append(tem_btns, parseToDOM(tmp_confirm))
            }

            // 有遮罩
            if (that.opts.showMask) {
               append(body, parseToDOM(tmp_mask))
            }

            if (that.opts.delay) {
                setTimeout(() => {
                    that.remove()
                }, that.opts.delay)
            }

            // 只要传参数，就监听关闭时间
            if (Object.keys(that.opts).length !== 0) {
                on($('.ui-dialog-button'), 'click', function(){
                    that.remove()
                })
            }
        }

        _prototype.remove = function(){
            removeElement()
        }

        function on(element, eventType, fn) {
            element.addEventListener(eventType, e => {
              let el = e.target
              el && fn.call(el, e, el)
            })
            return element
        }

        function $(element){
            return document.querySelector(element)
        }

        function removeElement(element){
            $('body').removeChild($('.ui-dialog'))
            if (document.getElementsByClassName('ui-dialog-mask').length !== 0) {
                 $('body').removeChild($('.ui-dialog-mask'))
                return;
            };
        }

        function hide(element){
            return element.style.display = 'none'
        }

        function parseToDOM(str){
           var div = document.createElement("div");
           if(typeof str == "string")
               div.innerHTML = str;
           return div.childNodes;
        }

        function removeChildren(element) {
            while (element.hasChildNodes()) {
              element.removeChild(element.lastChild)
            }
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
