from django.contrib import admin
from django.contrib.sessions.models import Session

# Register your models here.

from .models import Patient, Doctor, Question, Answer, Record, Symptom, Notes, Entity

class PatientAdmin(admin.ModelAdmin):
	list_display = [field.name for field in Patient._meta.get_fields()]

class DoctorAdmin(admin.ModelAdmin):
	list_display = [field.name for field in Doctor._meta.get_fields()]

class AnswerAdmin(admin.ModelAdmin):
	list_display = [field.name for field in Answer._meta.get_fields()]

class QuestionAdmin(admin.ModelAdmin):
	list_display = ('question',)

class EntityAdmin(admin.ModelAdmin):
	list_display = ('name', 'street', 'city', 'state', 'country',)
	# list_display = [field.name for field in Entity._meta.get_fields()]

class RecordAdmin(admin.ModelAdmin):
	# list_display = [field.name for field in Record._meta.get_fields()]
	list_display = ('date', 'user', 'score', 'created_date', 'signed',)

class NotesAdmin(admin.ModelAdmin):
	list_display = [field.name for field in Notes._meta.get_fields()]

class SymptomAdmin(admin.ModelAdmin):
	list_display = [field.name for field in Symptom._meta.get_fields()]

class SessionAdmin(admin.ModelAdmin):
    def _session_data(self, obj):
        return obj.get_decoded()
    list_display = ['session_key', '_session_data', 'expire_date']


admin.site.register(Session, SessionAdmin)
admin.site.register(Patient, PatientAdmin)
admin.site.register(Doctor, DoctorAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Entity, EntityAdmin)
admin.site.register(Record, RecordAdmin)
admin.site.register(Notes, NotesAdmin)
admin.site.register(Symptom, SymptomAdmin)