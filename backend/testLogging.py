import os
import django
import logging

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CPAS.settings')
django.setup()

logger = logging.getLogger('cpas')

#Sample logging messages for now

logger.debug("This is a DEBUG message")   #Won't be logged
logger.info("This is an INFO message")    #Will be logged
logger.warning("This is a WARNING")       #Will be logged
logger.error("This is an ERROR")          #Will be logged

