<style>
<%=_.templateList('base_css')%>
.jg-banner .icon-area img {
height: auto;
width: auto;
max-width: 100%;
max-height: 100%;
}
.jg-banner .text-area {
overflow: hidden;
}
.jg-banner .text-area .jg-description,
.jg-banner .text-area .jg-title {
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}
.jg-banner .icon-area {
<%=data.layout.iconArea%>
<%=data.content.iconAreaStyle%>
}
.jg-banner .btn-area {
<%=data.layout.btnArea%>
<%=data.content.btnAreaStyle%>
}
.jg-banner .btn-area .jg-btn:before {
<%=data.content.btnContentStyle%>
}
.jg-banner .text-area {
<%=data.layout.textArea%>
<%=data.content.textAreaStyle%>
}
.jg-banner .text-area .text-container {
<%=data.content.textContainerStyle%>
}
.jg-banner .text-area .jg-title {
<%=data.content.jgTitleStyle%>
}
.jg-banner .text-area .jg-title .text {
<%=data.content.jgTitleTextStyle%>
}
.jg-banner .text-area .jg-description {
<%=data.content.jgDescriptionStyle%>
}
.jg-banner .text-area .jg-description .text {
<%=data.content.jgDescriptionTextStyle%>
}
<%=data.content.animation%>
</style>
<a class="jg-banner jg-text-icon layout-area" href="<\\%=data.ClickUrl%\\>" target="_blank">
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
<%=_.templateList('impression_monitor')%>