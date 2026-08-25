from rest_framework import viewsets
from .models import Companies
from .serializers import CompanySerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Companies.objects.all().order_by('id')
    serializer_class = CompanySerializer