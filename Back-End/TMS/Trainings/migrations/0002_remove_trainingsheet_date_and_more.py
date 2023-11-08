# Generated by Django 4.2.4 on 2023-11-07 14:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Trainings', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trainingsheet',
            name='date',
        ),
        migrations.RemoveField(
            model_name='trainingsheet',
            name='endTime',
        ),
        migrations.RemoveField(
            model_name='trainingsheet',
            name='school',
        ),
        migrations.RemoveField(
            model_name='trainingsheet',
            name='startTime',
        ),
        migrations.RemoveField(
            model_name='trainingsheet',
            name='trainingStatus',
        ),
        migrations.RemoveField(
            model_name='trainingsheet',
            name='trainingType',
        ),
        migrations.AddField(
            model_name='trainingsheet',
            name='training',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Trainings.training'),
        ),
        migrations.AlterField(
            model_name='training',
            name='endTime',
            field=models.TimeField(choices=[('09:30:00', '09:30:00'), ('11:30:00', '11:30:00'), ('01:30:00', '01:30:00'), ('04:00:00', '04:00:00'), ('06:30:00', '06:30:00')]),
        ),
        migrations.AlterField(
            model_name='training',
            name='startTime',
            field=models.TimeField(choices=[('08:00:00', '08:00:00'), ('10:00:00', '10:00:00'), ('12:00:00', '12:00:00'), ('14:00:00', '14:00:00'), ('16:00:00', '16:00:00')]),
        ),
    ]
