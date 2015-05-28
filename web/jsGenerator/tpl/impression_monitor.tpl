<% if (!data.debug) { %>
<\\%
var impressionUrl = data.ImpressionUrl || [];
for (var i = 0, l = impressionUrl.length; i < l; i += 1) {
%\\>
<img class="logImg" src="<\\%=impressionUrl[i]%\\>"/>
<\\%
}
%\\>
<<\\%='script'%\\> src="http://s11.cnzz.com/z_stat.php?id=1254107932&web_id=1254107932"></<\\%='script'%\\>>
<% } %>
