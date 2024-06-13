from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from .models import Training, TrainingSheetModel



# Adding sheet to each school once a training assigned and update the current grade too
@receiver(m2m_changed, sender=Training.trainings.through)
def add_sheet_for_schools(sender, instance, action, **kwargs):
    if action == 'post_add':
        trainings = instance.trainings.all()
        instance.currentGrade = trainings.first().grades.first()
        for training in trainings:
            training.status = "ONGOING"
            training.save()
            # Check if the school sheet already exists or not
            if not TrainingSheetModel.objects.filter(school = training.school, subject = training.subject).exists():
                TrainingSheetModel.objects.create(school = training.school, subject = training.subject)
            

