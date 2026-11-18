import sys, os
here = os.path.dirname(os.path.abspath(__file__))
s = open(os.path.join(here, 'shell.html')).read()
for k, f in [('I18NX', 'i18n_extra.js'), ('I18N', 'i18n.js'), ('CORE', 'core.js'), ('APP', 'app.js')]:
    s = s.replace('/*' + k + '*/', open(os.path.join(here, f)).read())
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, '..', 'index.html')
open(out, 'w').write(s)
print(out, len(s))
