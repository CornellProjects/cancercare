from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from django.contrib.auth import get_user_model

# Custom models
from .models import Symptoms, Patient

# Serializers import
from .serializers import (
    UserCreateSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    SymptomsCreateSerializer,
    SymptomsGetSerializer,
    PatientCreateSerializer,
    PatientGetSerializer,
)

# rest_framework imports
from rest_framework import status
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    ListCreateAPIView
)

# Import permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
)

# Custom permissions
from .permissions import IsOwner

######################################################################################
# Method based views
# endpoint for '/home'
def index(request):
    #get the template 
    template = loader.get_template('index.html')
    return HttpResponse(template.render())


######################################################################################
# Class based views

User = get_user_model()

class UserCreateView(CreateAPIView):
    '''API to create a new user '''
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()


class UserLoginView(APIView):
    '''API to login and obtain an auth token'''
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            result = serializer.data
            # Only return token
            if result.has_key('username'):
                result.pop('username')
            if result.has_key('email'):
                result.pop('email')
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    '''API to GET user profile information.'''
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get(self, request, format=None):
        user_obj = self.request.user
        query = User.objects.filter(username=user_obj)
        serializer = UserProfileSerializer(user_obj)
        return Response(serializer.data)


# Symptoms Create API
class SymptomsCreateAPIView(ListCreateAPIView):
    """
    Create a new symptoms record.
    """
    queryset = Symptoms.objects.all()
    serializer_class = SymptomsCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)



class PatientCreateAPIView(ListCreateAPIView):
    serializer_class = PatientCreateSerializer
    permission_classes = [AllowAny]
    queryset = Patient.objects.all()


# Symptoms GET API
class SymptomsGetAPIView(ListAPIView):
    """
    Get symptoms for a user.
    """
    queryset = Symptoms.objects.all()
    serializer_class = SymptomsGetSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        symptoms = Symptoms.objects.filter(owner=self.request.user)
        serializer = SymptomsGetSerializer(symptoms, many=True,)
        return Response(serializer.data)


class PatientGetAPIView(APIView):
    queryset = Patient.objects.all()
    serializer_class = PatientGetSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        patient = Patient.objects.filter(patient=self.request.user)
        serializer = PatientGetSerializer(patient, many=True,)
        return Response(serializer.data)