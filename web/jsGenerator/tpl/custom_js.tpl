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
        <%=_.templateList('rsa_monitor', data)%>
        <%=_.templateList('resize', data)%>
    }, 0);
}.call(this))
