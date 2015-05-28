<%=_.templateList('base_head', data)%>
<style>
.btn-area {
    position: absolute;
    top:0;
}
.image-area {
    width: 100%;
    height: 100%;
    display: block;
}
.image-area .jg-image {
    display: block;
}
.image-area img {
    height: 100%;
    width: 100%;
}
.no-image {
<%=data.layout.noImage%>
}
.jg-banner {
<%=data.content.bannerStyle%>
}
.btn-area {
<%=data.layout.btnArea%>
<%=data.content.btnAreaStyle%>
}
.btn-area .jg-btn:before {
<%=data.content.btnContentStyle%>
}
.image-area {
<%=data.layout.imageArea%>
<%=data.content.imageAreaStyle%>
}
.image-area img{
<%=data.content.imageStyle%>
}
<%=data.content.animation%>
</style>
<a id="jg-link" class="jg-banner jg-image layout-area" href="<\\%=data.ClickUrl%\\>" target="_blank">
    <div class="layout-area image-area">
        <div class="jg-image jq-container">
            <img src="<\\%=data.ImageUrl%\\>" onerror="this.parentNode.parentNode.parentNode.className+=' no-image'" />
        </div>
    </div>
    <div class="layout-area btn-area">
        <div class="jg-btn jq-container"></div>
    </div>
</a>
<%=_.templateList('impression_monitor', data)%>
<%=_.templateList('base_foot', data)%>