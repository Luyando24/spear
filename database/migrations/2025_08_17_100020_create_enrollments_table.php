<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->float('progress')->default(0);
            $table->date('completion_date')->nullable();
            $table->timestamp('enrolled_at')->nullable();
            $table->string('certificate_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->text('feedback')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('enrollments');
    }
};
