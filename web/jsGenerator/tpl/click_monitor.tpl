<% if (!data.debug) { %>
<\\%
var clickMonitor = data.ClickMonitor || [];
for (var i = 0, l = clickMonitor.length; i < l; i += 1) {
%\\>
<input name="click" value="<\\%=clickMonitor[i]%\\>" type="hidden">
<\\%
}
%\\>
<% } %>
