import urllib.request
import random
import time


n=1

for i in range(1,1000):
    urllib.request.urlretrieve(url, 'CAPTCHA/' + str(n) + '.png')
    n += 1
    ran = random.randrange(12,30)
    time.sleep(ran)
    print(ran)
    if n == 51:
        print('done')
        break

