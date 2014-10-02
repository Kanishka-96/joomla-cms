var JFormValidator=function(){var e,t,n,r,i=function(e,n,r){r=r===""?!0:r,t[e]={enabled:r,exec:n}},s=function(e,t){var n,r=jQuery(t);return e?(n=r.find("#"+e+"-lbl"),n.length?n:(n=r.find('label[for="'+e+'"]'),n.length?n:!1)):!1},o=function(e,t){var n=t.data("label");n===undefined&&(n=s(t.attr("id"),t.data("form")),t.data("label",n)),e===!1?(t.addClass("invalid").attr("aria-invalid","true"),n&&n.addClass("invalid").attr("aria-invalid","true")):(t.removeClass("invalid").attr("aria-invalid","false"),n&&n.removeClass("invalid").attr("aria-invalid","false"))},u=function(e){var n=jQuery(e),r,i;if(n.attr("disabled"))return o(!0,n),!0;if(n.attr("required")||n.hasClass("required")){r=n.prop("tagName").toLowerCase();if(r==="fieldset"&&(n.hasClass("radio")||n.hasClass("checkboxes"))){if(!n.find("input:checked").length)return o(!1,n),!1}else if(!n.val()||n.hasClass("placeholder")||n.attr("type")==="checkbox"&&!n.is(":checked"))return o(!1,n),!1}return i=n.attr("class")&&n.attr("class").match(/validate-([a-zA-Z0-9\_\-]+)/)?n.attr("class").match(/validate-([a-zA-Z0-9\_\-]+)/)[1]:"",i===""?(o(!0,n),!0):i&&i!=="none"&&t[i]&&n.val()&&t[i].exec(n.val())!==!0?(o(!1,n),!1):(o(!0,n),!1)},a=function(e){var t=!0,n,i,s,o,a;jQuery.each(jQuery(e).find("input, textarea, select, fieldset, button"),function(e,n){u(n)===!1&&(t=!1)}),jQuery.each(r,function(e,n){n.exec()!==!0&&(t=!1)});if(!t){i=Joomla.JText._("JLIB_FORM_FIELD_INVALID"),s=jQuery("input.invalid, textarea.invalid, select.invalid, fieldset.invalid, button.invalid"),o={},o.error=[];for(n=0;n<s.length;n++)a=jQuery("label[for="+s[n].id+"]").text(),a!=="undefined"&&(o.error[n]=i+a.replace("*",""));Joomla.renderMessages(o)}return t},f=function(t){var r=[];$form=jQuery(t),$form.find("input, textarea, select, fieldset, button").each(function(){var i=e(this),s=i.attr("id"),o=i.prop("tagName").toLowerCase();i.hasClass("required")&&i.attr("aria-required","true").attr("required","required"),o!=="input"&&o!=="button"||i.attr("type")!=="submit"?(o!=="fieldset"&&(i.on("blur",function(){return u(this)}),i.hasClass("validate-email")&&n&&(i.get(0).type="email")),i.data("form",$form),r.push(i)):i.hasClass("validate")&&i.on("click",function(){return a(t)})}),$form.data("inputfields",r)},l=function(){e=jQuery.noConflict(),t={},r=r||{},n=function(){var e=document.createElement("input");return e.setAttribute("type","email"),e.type!=="text"}(),i("username",function(e){return regex=new RegExp("[<|>|\"|'|%|;|(|)|&]","i"),!regex.test(e)}),i("password",function(e){return regex=/^\S[\S ]{2,98}\S$/,regex.test(e)}),i("numeric",function(e){return regex=/^(\d|-)?(\d|,)*\.?\d*$/,regex.test(e)}),i("email",function(e){return e=punycode.toASCII(e),regex=/^[a-zA-Z0-9.!#$%&‚Äô*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,regex.test(e)}),jQuery("form.form-validate").each(function(){f(this)})};return l(),{isValid:a,validate:u,setHandler:i,attachToForm:f,custom:r}};document.formvalidator=null,jQuery(function(){document.formvalidator=new JFormValidator});