<!--asset js for {#page}-->
<echo>${out.m.dir}/asset/${site}-{#page}.js</echo>
<concat destfile="${out.m.dir}/asset/${site}-{#page}.js" encoding="${encoding}"
        fixlastline="on">
    <filelist dir="asset" files="${lib.js.file}"/>
    <filelist dir="${module.dir}" files="${{#site}sitecommonmodulejs.files}"/>
    <filelist dir="${module.dir}" files="${{#page}commonmodulejs.files}"/>
    <filelist dir="${out.m.dir}" files="${site}.js"/>
    <filelist dir="${site.dir}/asset/module" files="
    ${{#site}siteprivatemodulejs.files}
    ${{#page}siteCommonmodulejs.files}
    "/>
    <filelist dir="${site.dir}/src/{#page}/module" files="${{#page}privatemodulejs.files}"/>
    <filelist dir="${site.dir}/src" files="${{#page}js.files}"/>
</concat>

<!--asset css for {#page}-->
<echo>${out.m.dir}/asset/${site}-{#page}.css</echo>
<concat destfile="${out.m.dir}/asset/${site}-{#page}.css" encoding="${encoding}"
        fixlastline="on">
    <filelist dir="${out.m.dir}" files="${site}.css"/>
    <filelist dir="${module.dir}" files="${{#site}sitecommonmodulecss.files}"/>
    <filelist dir="${module.dir}" files="${{#page}commonmodulecss.files}"/>
    <filelist dir="${site.dir}/asset/module" files="
    ${{#site}siteprivatemodulecss.files}
    ${{#page}siteCommonmodulecss.files}
    "/>
    <filelist dir="${site.dir}/src/{#page}/module" files="${{#page}privatemodulecss.files}"/>
    <filelist dir="${site.dir}/src" files="${{#page}css.files}"/>
</concat>
<!--asset html for {#page}-->
<echo>${out.m.dir}/asset/${site}-{#page}.html</echo>
<concat destfile="${out.m.dir}/asset/${site}-{#page}.html" encoding="${encoding}"
        fixlastline="on">
    <filelist dir="${out.m.dir}" files="${site}.html"/>
    <filelist dir="${module.dir}" files="${{#site}sitecommonmodulehtml.files}"/>
    <filelist dir="${module.dir}" files="${{#page}commonmodulehtml.files}"/>
    <filelist dir="${site.dir}/asset/module" files="
    ${{#site}siteprivatemodulehtml.files}
    ${{#page}siteCommonmodulehtml.files}
    "/>
    <filelist dir="${site.dir}/src/{#page}/module" files="${{#page}privatemodulehtml.files}"/>
    <filelist dir="${site.dir}/src" files="${{#page}tpl.files}"/>
</concat>
<replaceregexp file="${out.m.dir}/asset/${site}-{#page}.html"
               encoding="${encoding}"
               match="&gt;\s+?&lt;" replace="&gt;&lt;" flags="g m"/>