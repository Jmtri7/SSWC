import os
os.remove("flowers2019.db")
from shutil import copyfile
copyfile("flowers2019.db.backup", "flowers2019.db")
