<x-filament::widget>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-primary-50 border border-primary-200 rounded-xl p-6 flex flex-col items-center shadow">
            <div class="text-lg font-semibold text-primary-700">Users</div>
            <div class="text-4xl font-bold text-primary-900 mt-2">{{ $userCount }}</div>
        </div>
        <div class="bg-success-50 border border-success-200 rounded-xl p-6 flex flex-col items-center shadow">
            <div class="text-lg font-semibold text-success-700">Courses</div>
            <div class="text-4xl font-bold text-success-900 mt-2">{{ $courseCount }}</div>
        </div>
        <div class="bg-warning-50 border border-warning-200 rounded-xl p-6 flex flex-col items-center shadow">
            <div class="text-lg font-semibold text-warning-700">Enrollments</div>
            <div class="text-4xl font-bold text-warning-900 mt-2">{{ $enrollmentCount }}</div>
        </div>
    </div>
</x-filament::widget>
