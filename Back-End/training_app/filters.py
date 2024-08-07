import django_filters
from .models import Training, TrainingSheetModel, TrainingRequestsModel

class TrainingFilter(django_filters.FilterSet):
    class Meta:
        model = Training
        fields = {
            'trainer': ['exact'],
            'active': ['exact'],
            'trainingStatus': ['exact'],
            'currentGrade': ['exact'],
            'trainings__school': ['exact'],
            'trainings__subject': ['exact'],
            'trainings__requestor': ['exact'],
        }
    



class TrainingSheetModelFilter(django_filters.FilterSet):
    class Meta:
        model = TrainingSheetModel
        fields = ['school', 'subject']


class TrainingRequestFilter(django_filters.FilterSet):
    class Meta:
        model = TrainingRequestsModel
        fields = ['school', 'subject', 'requestor', 'status']