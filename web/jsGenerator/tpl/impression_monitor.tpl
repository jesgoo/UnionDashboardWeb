<% if (!data.debug) { %>
<\\%
var impressionUrl = data.ImpressionUrl || [];
for (var i = 0, l = impressionUrl.length; i < l; i += 1) {
%\\>
<img class="logImg" src="<\\%=impressionUrl[i]%\\>"/>
<\\%
}
%\\>
<% } %>
