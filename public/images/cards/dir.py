import os

for root, sub_folders, files in os.walk('C:\\Disks\\e\\Study Related\\javascript\\dicegame\\images\\cards'):
    fle=[]
    for file in files:
        fle.append(file)


print(fle)