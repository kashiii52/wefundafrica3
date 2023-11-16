from django.shortcuts import render
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

def index(request):
    return render(request,'index.html') or render(request,os.path.join(BASE_DIR,'wefund-africa/build/index.html')) 