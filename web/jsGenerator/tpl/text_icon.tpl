<%=_.templateList('base_head', data)%>
<style>
.icon-area img {
height: auto;
width: auto;
max-width: 100%;
max-height: 100%;
}
.text-area {
overflow: hidden;
}
.text-area .jg-description,
.text-area .jg-title {
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}
.jg-banner {
<%=data.content.bannerStyle%>
}
.icon-area {
<%=data.layout.iconArea%>
<%=data.content.iconAreaStyle%>
}
.icon-area img{
<%=data.content.iconStyle%>
}
.btn-area {
<%=data.layout.btnArea%>
<%=data.content.btnAreaStyle%>
}
.btn-area .jg-btn:before {
<%=data.content.btnContentStyle%>
}
.text-area {
<%=data.layout.textArea%>
<%=data.content.textAreaStyle%>
}
.no-image .text-area {
<%=data.layout.noIcon%>
}
.text-area .text-container {
<%=data.content.textContainerStyle%>
}
.text-area .jg-title {
<%=data.content.jgTitleStyle%>
}
.text-area .jg-title .text {
<%=data.content.jgTitleTextStyle%>
}
.text-area .jg-description {
<%=data.content.jgDescriptionStyle%>
}
.text-area .jg-description .text {
<%=data.content.jgDescriptionTextStyle%>
}
<%=data.content.animation%>
</style>
<a id="jg-link" class="jg-banner jg-text-icon layout-area" href="<\\%=data.ClickUrl%\\>" target="_blank">
    <%
    var area = [];
    var layout = data.scale.layout || {};
    for (var areaName in layout) {
        area[layout[areaName]] = areaName;
    }
    %>
    <%=_.templateList('text_icon_' + area[0])%>
    <%=_.templateList('text_icon_' + area[2])%>
    <%=_.templateList('text_icon_' + area[1])%>
</a>
<%=_.templateList('impression_monitor', data)%>
<%=_.templateList('click_monitor', data)%>
<%=_.templateList('base_foot', data)%>