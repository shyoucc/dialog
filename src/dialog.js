/**
 * @author 厦门智协
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
            this.create()
        }

        let _prototype = Dialog.prototype


        _prototype.create = function(){
            let that = this
            // 字符串模板
            let body = $('body')
            let tmp_wrapper = '<div class="ui-dialog ui-popup-show"><div class="ui-dialog-header"></div><div class="ui-dialog-content"></div><div class="ui-dialog-content-btns"></div></div>'
            let spinner = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'

            let wrapper = parseToDOM(tmp_wrapper)

            append(body, wrapper)

            // 如果什么都没传的话
            let tmp_header = $('.ui-dialog-header')
            if (Object.keys(that.opts).length === 0) {
                append(tmp_header, parseToDOM(spinner))
            }
        }

        _prototype.remove = function(){

        }

        function $(element){
            return document.querySelector(element)
        }

        function parseToDOM(str){
           var div = document.createElement("div");
           if(typeof str == "string")
               div.innerHTML = str;
           return div.childNodes;
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
