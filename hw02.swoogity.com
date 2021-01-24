server {
	listen 80;
	listen [::]:80;
	
	root /home/aj/www/hw02.swoogity.com;
	index index.html;
	server_name hw02.swoogity.com;

	location / {
		try_files $uri $uri/ =404;
	}
	
	location /animal {
		root /home/aj/www/hw02.swoogity.com;
		index animal.html;
		
		try_files $uri $uri/ =404;
	}

	location /calculator {
		root /home/aj/www/hw02.swoogity.com;
		index calc.html;

		try_files $uri $uri/ =404;
	}


}
