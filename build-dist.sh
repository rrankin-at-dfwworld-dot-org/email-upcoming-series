# build for distribution at https://www.dfwworld.org/cms/emailgallery
grunt build:distribution; 
premailer --base-url "https://www.dfwworld.org" --css tmp/css/tidy.css dist/index.html > dist/$(date +%Y%m%d).html; 
csscomb --verbose tmp/css/style.css; 
cat tmp/css/style.css | pbcopy;