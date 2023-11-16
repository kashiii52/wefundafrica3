from django.shortcuts import render

def index(request):
    return render(request,'index.html')
    # return render(request,'../wefund-africa/build/index.html')