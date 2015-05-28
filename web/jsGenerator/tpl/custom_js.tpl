(function () {
    var jesgooData = this.jesgoo_data || {};
    var html = (<%=data.source%>.call(this, jesgooData.d));
    var doc = this.document;
    if(!doc){
        console.log(html);
        return;
    }
    setTimeout(function () {
        doc.open();doc.write(html);doc.close();
        <%=_.templateList('resize', data)%>
        <%=_.templateList('rsa_monitor', data)%>
    }, 0);
<% if (!data.debug) { %>
    <%=_.templateList('rsa', data)%>
    <%=_.templateList('rsa_key', data)%>
<% } %>
}.call(this))
