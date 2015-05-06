<style>
<%=_.templateList('base_css')%>
.jg-banner .btn-area {
    position: absolute;
    top:0;
}
.jg-banner .image-area img {
height: 100%;
width: 100%;
}
.jg-banner .btn-area {
<%=data.layout.btnArea%>
<%=data.content.btnAreaStyle%>
}
.jg-banner .btn-area .jg-btn:before {
<%=data.content.btnContentStyle%>
}
.jg-banner .image-area {
<%=data.layout.imageArea%>
<%=data.content.imageAreaStyle%>
}
<%=data.content.animation%>
</style>
<a class="jg-banner jg-image layout-area" href="<\\%=data.ClickUrl%\\>" target="_blank">
    <div class="layout-area image-area">
        <div class="jg-image jq-container">
            <img src="<\\%=data.ImageUrl%\\>" onerror="this.parentNode.parentNode.parentNode.className+=' no-image'" />
        </div>
    </div>
    <div class="layout-area btn-area">
        <div class="jg-btn jq-container"></div>
    </div>
</a>
    <%=_.templateList('impression_monitor')%>
