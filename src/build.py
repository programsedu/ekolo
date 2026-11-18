s=open('shell.html').read()
for k,f in [('I18N','i18n.js'),('CORE','core.js'),('APP','app.js')]:
    s=s.replace('/*'+k+'*/',open(f).read())
open('../index.html','w').write(s)
print(len(s))
