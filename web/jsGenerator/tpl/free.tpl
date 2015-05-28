<%=_.templateList('base_head', data)%>
<style>
.jg-banner {
<%=data.content.bannerStyle%>
}
<%=data.content.animation%>
</style>
<%=_.templateList('impression_monitor', data)%>
<a id="jg-link" class="jg-banner jg-free" href="<\\%=data.ClickUrl%\\>" target="_blank">
    <%=data.content.html%>
</a>
<%=_.templateList('base_foot', data)%>